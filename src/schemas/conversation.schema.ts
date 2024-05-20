import { z, ZodType } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

export type ConversationSearchProps = {
  query: string;
  domain: string;
};

export type ChatBotMessageProps = {
  content?: string;
  image?: any;
};

export type CustomerBotHistoryProps = {
  email: string;
};

export const ConversationSearchSchema: ZodType<ConversationSearchProps> =
  z.object({
    query: z.string().min(1, { message: "You must entery a search query" }),
    domain: z.string().min(1, { message: "You must select a domain" }),
  });

export const ChatBotMessageSchema: ZodType<ChatBotMessageProps> = z
  .object({
    content: z
      .string()
      .min(1)
      .optional()
      .or(z.literal("").transform(() => undefined)),
    image: z.any().optional(),
  })
  .refine((schema) => {
    if (schema.image?.length) {
      if (
        ACCEPTED_FILE_TYPES.includes(schema.image?.[0].type!) &&
        schema.image?.[0].size <= MAX_UPLOAD_SIZE
      ) {
        return true;
      }
    }
    if (!schema.image?.length) {
      return true;
    }
  });

export const CustomerBotHistorySchema: ZodType<CustomerBotHistoryProps> =
  z.object({
    email: z.string().email({ message: "this is not a valid email" }),
  });
