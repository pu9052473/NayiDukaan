import React from "react";
import BecomeSellerForm from "@/components/BecomeSellerForm";
const page = () => {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-2xl font-bold ">Become a seller by filling these details
      </h1>
      <BecomeSellerForm />
    </div>
  );
};

export default page;
