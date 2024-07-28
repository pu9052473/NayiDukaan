import React from "react";
import Link from "next/link";
import MainBtn from "../../Components/MainBtn";
import BecomeSellerForm from "@/Components/BecomeSellerForm";

const page = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
        Seller Form Coming soon{" "}
      </h3>
      <BecomeSellerForm />
      <Link href="/SellerDashboard" className="">
      
        <MainBtn
          value="Go To Seller Dashboard"
          className="w-full py-2 bg-colorThree mt-4 "
        />
      </Link>
    </div>
  );
};

export default page;
