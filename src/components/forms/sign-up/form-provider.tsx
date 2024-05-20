"use client";

import React from "react";
import { FormProvider } from "react-hook-form";
import { useSignUpForm } from "../../../hooks/sign-up/use-sign-up";
import { AuthContextProvider } from "@/context/use-auth-context";
import { Loader } from "@/components/loader";

type AuthFormProviderProps = {
  children: React.ReactNode;
};

export const SignUpFormProvider = ({ children }: AuthFormProviderProps) => {
  const { methods, onHandleSubmit, loading } = useSignUpForm();

  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className="h-full">
          <div className="flex flex-col justify-between gap-3 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};
