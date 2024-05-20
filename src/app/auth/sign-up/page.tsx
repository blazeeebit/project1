import React from "react";
import { SignUpFormProvider } from "../../../components/forms/sign-up/form-provider";
import { RegistrationFormStep } from "../../../components/forms/sign-up/registration-step";
import { HighLightBar } from "../../../components/forms/sign-up/hightlight-bar";
import { ButtonHandler } from "../../../components/forms/sign-up/button-handlers";

const SignUpPage = () => {
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignUpFormProvider>
          <div className="flex flex-col gap-3">
            <RegistrationFormStep />
            <ButtonHandler />
          </div>
          <HighLightBar />
        </SignUpFormProvider>
      </div>
    </div>
  );
};

export default SignUpPage;
