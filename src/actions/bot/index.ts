"use server";

import { client } from "@/lib/prisma";
import { extractEmailsFromString, extractURLfromString } from "@/lib/utils";
import OpenAi from "openai";
import { onMailer } from "../mailer/mailer";
import { clerkClient } from "@clerk/nextjs";
import { onRealTimeChat } from "../conversation";

const openai = new OpenAi({
  apiKey: process.env.OPEN_AI_KEY,
});

export const onStoreConversations = async (
  id: string,
  message: string,
  role: "assistant" | "user"
) => {
  console.log(id, ": ", message);
  await client.chatRoom.update({
    where: {
      id,
    },
    data: {
      message: {
        create: {
          message,
          role,
        },
      },
    },
  });
};

export const onGetCurrentChatBot = async (id: string) => {
  try {
    const chatbot = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        helpdesk: true,
        name: true,
        chatBot: {
          select: {
            id: true,
            welcomeMessage: true,
            icon: true,
          },
        },
      },
    });

    if (chatbot) {
      return chatbot;
    }
  } catch (error) {
    console.log(error);
  }
};

//to persist the email
let customerEmail: string | undefined;

export const onAiChatBotAssistant = async (
  id: string,
  chat: { role: "assistant" | "user"; content: string }[],
  author: "user",
  message: string
) => {
  try {
    //first lets get all the domain info for the chatbot to use
    const chatBotDomain = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        filterQuestions: {
          where: {
            answered: null,
          },
          select: {
            question: true,
          },
        },
      },
    });

    if (chatBotDomain) {
      //we extract the email from the customers response
      const extractedEmail = extractEmailsFromString(message);
      if (extractedEmail) {
        //we set that email to the global variable
        customerEmail = extractedEmail[0];
      }

      //if we find an email we go into the customer creation process
      if (customerEmail) {
        //if we find an email we first create a new customer chat room so we can store an instance of that customer
        //well check if a customer with that email already exists for that domain

        const checkCustomer = await client.domain.findUnique({
          where: {
            id,
          },
          select: {
            User: {
              select: {
                clerkId: true,
              },
            },
            name: true,
            customer: {
              where: {
                email: {
                  startsWith: customerEmail,
                },
              },
              select: {
                id: true,
                email: true,
                questions: true,
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                    mailed: true,
                  },
                },
              },
            },
          },
        });

        if (checkCustomer && !checkCustomer.customer.length) {
          //well create that new customer
          const newCustomer = await client.domain.update({
            where: {
              id,
            },
            data: {
              customer: {
                create: {
                  email: customerEmail,
                  questions: {
                    create: chatBotDomain.filterQuestions,
                  },
                  chatRoom: {
                    create: {},
                  },
                },
              },
            },
          });

          if (newCustomer) {
            console.log("new customer made");
            const response = {
              role: "assistant",
              content: `Welcome aboard ${
                customerEmail.split("@")[0]
              }! I'm glad to connect with you. Is there anything you need help with?`,
            };

            return { response };
          }
        }

        if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
          //move to live mode
          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            message,
            author
          );

          onRealTimeChat(
            checkCustomer.customer[0].chatRoom[0].id,
            message,
            "user",
            author
          );

          //check if already mailed
          if (!checkCustomer.customer[0].chatRoom[0].mailed) {
            const user = await clerkClient.users.getUser(
              checkCustomer.User?.clerkId!
            );

            onMailer(user.emailAddresses[0].emailAddress);

            //update mail status to prevent spamming
            const mailed = await client.chatRoom.update({
              where: {
                id: checkCustomer.customer[0].chatRoom[0].id,
              },
              data: {
                mailed: true,
              },
            });

            if (mailed) {
              return {
                live: true,
                chatRoom: checkCustomer.customer[0].chatRoom[0].id,
              };
            }
          }

          return {
            live: true,
            chatRoom: checkCustomer.customer[0].chatRoom[0].id,
          };
        }

        await onStoreConversations(
          checkCustomer?.customer[0].chatRoom[0].id!,
          message,
          author
        );

        //if we already find a customer with that email we will simply greet them an move to the questions
        const chatCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: "assistant",
              content: `
              You will get an array of questions that you must ask the customer. 
              
              Progress the conversation using those questions. 
              
              When ever you ask a question from the array i need you to add a keyword at the end of the question (complete) this keyword is extremely important. 
              
              Do not forget it.

              only add this keyword when your asking a question from the array of questions. No other question satisfies this condition

              Always maintain character and stay respectfull.

              The array of questions : [${chatBotDomain.filterQuestions
                .map((questions) => questions.question)
                .join(", ")}]

              if the customer says something out of context or inapporpriate. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime) at the end.

              if the customer agrees to book an appointment send them this link http://localhost:3000/portal/${id}/appointment/${
                checkCustomer?.customer[0].id
              }

              if the customer wants to buy a product redirect them to the payment page http://localhost:3000/portal/${id}/payment/${
                checkCustomer?.customer[0].id
              }
          `,
            },
            ...chat,
            {
              role: "user",
              content: message,
            },
          ],
          model: "gpt-3.5-turbo",
        });

        //we check for the realtime keyword and then switch to realtime mode
        if (chatCompletion.choices[0].message.content?.includes("(realtime)")) {
          const realtime = await client.chatRoom.update({
            where: {
              id: checkCustomer?.customer[0].chatRoom[0].id,
            },
            data: {
              live: true,
            },
          });

          if (realtime) {
            const response = {
              role: "assistant",
              content: chatCompletion.choices[0].message.content.replace(
                "(realtime)",
                ""
              ),
            };

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              response.content,
              "assistant"
            );

            return { response };
          }
        }

        if (chat[chat.length - 1].content.includes("(complete)")) {
          //if the last question had a question keyword we will store the current customer message as a response
          //we will look for the first unanswered question and store the answer at its id
          //we do this because we cannot predict if the customer answered all the questions
          //they maybe have left it half way so we will store the response at the first unanswered question found
          //since the questions are in order
          const firstUnansweredQuestion =
            await client.customerResponses.findFirst({
              where: {
                customerId: checkCustomer?.customer[0].id,
                answered: null,
              },
              select: {
                id: true,
              },
              orderBy: {
                question: "asc",
              },
            });

          if (firstUnansweredQuestion) {
            await client.customerResponses.update({
              where: {
                id: firstUnansweredQuestion.id,
              },
              data: {
                answered: message,
              },
            });
          }
        }

        if (chatCompletion) {
          const generatedLink = extractURLfromString(
            chatCompletion.choices[0].message.content as string
          );

          if (generatedLink) {
            const link = generatedLink[0];
            const response = {
              role: "assistant",
              content: `Great! you can following the link to proceed`,
              link: link.slice(0, -1),
            };

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              `${response.content} ${response.link}`,
              "assistant"
            );

            return { response };
          }

          const response = {
            role: "assistant",
            content: chatCompletion.choices[0].message.content,
          };

          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            `${response.content}`,
            "assistant"
          );

          return { response };
        }
      }

      //until an email is provided we will simply assume the customer is anonymous
      console.log("No customer");
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "assistant",
            content: `
            You are a highly knowledgeable and experienced sales representative for a ${chatBotDomain.name} that offers a valuable product or service. Your goal is to have a natural, human-like conversation with the customer in order to understand their needs, provide relevant information, and ultimately guide them towards making a purchase or redirect them to a link if they havent provided all relevant information.
            Right now you are talking to a customer for the first time. Start by giving them a warm welcome on behalf of ${chatBotDomain.name} and make them feel welcomed.

            Your next task is lead the conversation naturally to get the customers email address. Be respectful and never break character

          `,
          },
          ...chat,
          {
            role: "user",
            content: message,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      if (chatCompletion) {
        const response = {
          role: "assistant",
          content: chatCompletion.choices[0].message.content,
        };

        return { response };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
