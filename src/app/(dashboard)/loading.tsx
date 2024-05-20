import { Spinner } from "@/components/spinner";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default LoadingPage;
