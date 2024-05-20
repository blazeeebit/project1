import { Loader } from "@/components/loader";
import { Section } from "@/components/section-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useFilterQuestions } from "@/hooks/settings/use-settings";
import React from "react";
import { FormGenerator } from "../form-generator";
import { Button } from "@/components/ui/button";

type FilterQuestionsProps = {
  id: string;
};

export const FilterQuestions = ({ id }: FilterQuestionsProps) => {
  const { register, onAddFilterQuestions, errors, loading, isQuestions } =
    useFilterQuestions(id);
  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Filter Questions</CardTitle>
        <form
          onSubmit={onAddFilterQuestions}
          className="flex flex-col gap-6 mt-10">
          <div className="flex flex-col gap-3">
            <Section
              label="Question"
              message="Your AI assistant will try to get the information from your client in a casual conversation. If it can’t, they will be redirected to a form to fill out the information."
            />
            <FormGenerator
              type="text"
              inputType="input"
              placeholder="Type your question"
              register={register}
              name="question"
              errors={errors}
            />
          </div>
          <Button
            type="submit"
            className="bg-orange hover:bg-orange hover:opacity-70 transition duration-150 ease-in-out text-black font-semibold">
            Create
          </Button>
        </form>
      </CardContent>
      <CardContent className="p-6 border-r-[1px] flex flex-col gap-5">
        <Loader loading={loading}>
          {isQuestions.length ? (
            isQuestions.map((question) => (
              <p key={question.id} className="font-bold">
                {question.question}
              </p>
            ))
          ) : (
            <CardDescription>No Questions</CardDescription>
          )}
        </Loader>
      </CardContent>
    </Card>
  );
};
