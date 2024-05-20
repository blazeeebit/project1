import React from "react";
import { UserTypeCard } from "./user-type-card";
import { FieldValues, UseFormRegister } from "react-hook-form";

type TypeSelectionFormProps = {
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
};

export const TypeSelectionForm = ({
  register,
  userType,
  setUserType,
}: TypeSelectionFormProps) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Create an account</h2>
      <p className="text-iridium md:text-sm">
        Tell us about yourself! What do you do? Let’s tailor your
        <br /> experience so it best suits you.
      </p>
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="owner"
        title="I own a buisness"
        text="Setting up my account for my company."
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="student"
        title="Im a student"
        text="Looking to learn about the tool."
      />
    </>
  );
};
