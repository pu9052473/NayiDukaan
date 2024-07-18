import AddProductForm from "@/components/AddProductForm";
import React from "react";


const page = () => {
  return (
    <div className="flex h-screen">
      <main className="w-4/5 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Add Products
        </h2>
        <AddProductForm />
      </main>
    </div>
  );
};

export default page;
