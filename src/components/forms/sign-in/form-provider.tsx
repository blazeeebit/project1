"use client";

import React from "react";
import { FormProvider } from "react-hook-form";
import { AuthContextProvider } from "@/context/use-auth-context";
import { Loader } from "@/components/loader";
import { useSignInForm } from "@/hooks/sign-in/use-sign-in";

type AuthFormProviderProps = {
  children: React.ReactNode;
};

export const SignInFormProvider = ({ children }: AuthFormProviderProps) => {
  const { methods, onHandleSubmit, loading } = useSignInForm();

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
