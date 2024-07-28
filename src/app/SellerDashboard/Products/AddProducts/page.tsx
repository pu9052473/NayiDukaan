import AddProductForm from "@/components/AddProductForm";
import { AddProductProvider } from "@/context/ProductContext/ProductDataContext";
import React from "react";


const page = () => {
  return (
    <div className="flex h-screen">
      <main className="w-4/5 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Add Products
        </h2>
        <AddProductProvider>
          <AddProductForm />
        </AddProductProvider>
      </main>
    </div>
  );
};

export default page;
