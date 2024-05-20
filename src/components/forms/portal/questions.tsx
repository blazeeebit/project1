import React from "react";
import { FormGenerator } from "../form-generator";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";

type QuestionsFormProps = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  register: UseFormRegister<FieldValues>;
  error: FieldErrors<FieldValues>;
  onNext(): void;
};

export const QuestionsForm = ({
  questions,
  register,
  error,
  onNext,
}: QuestionsFormProps) => {
  return (
    <div className="flex flex-col gap-5 justify-center">
      <div className="flex justify-center">
        <h2 className="text-4xl font-bold mb-5">Account Details</h2>
      </div>
      {questions.map((question) => (
        <FormGenerator
          defaultValue={question.answered || ""}
          key={question.id}
          name={`question-${question.id}}`}
          errors={error}
          register={register}
          label={question.question}
          type="text"
          inputType="input"
          placeholder={question.answered || "Not answered"}
        />
      ))}
      <Button className="mt-5" type="button" onClick={onNext}>
        Next
      </Button>
    </div>
  );
};
