"use client";
import { Label } from "@radix-ui/react-label";
import { Edit } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type UploadButtonProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  label: string;
};

export const UploadButton = ({
  register,
  errors,
  label,
}: UploadButtonProps) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <Label
          htmlFor="upload-button"
          className="flex gap-2 p-3 rounded-lg bg-muted text-gray-600 cursor-pointer font-semibold text-sm items-center">
          <Input
            {...register("image")}
            className="hidden"
            type="file"
            id="upload-button"
          />
          <Edit />
          {label}
        </Label>
        <p className="text-sm text-gray-400 ml-6">
          Recommended size is 300px * 300px, size <br /> less than 2MB
        </p>
      </div>
      <ErrorMessage
        errors={errors}
        name="image"
        render={({ message }) => (
          <p className="text-red-400 mt-2">
            {message === "Required" ? "" : message}
          </p>
        )}
      />
    </>
  );
};
