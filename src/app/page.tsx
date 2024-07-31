"use client";

import HomePage from "@/components/HomePage";
import { FetchProductsProvider } from "@/context/ProductContext/ProductDataContext";

const Page = () => {

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <FetchProductsProvider>
        <HomePage />
      </FetchProductsProvider>
    </div>
  );
};

export default Page;
