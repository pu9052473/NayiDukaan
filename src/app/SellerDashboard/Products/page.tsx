import React from "react";

import SellerDashboardBox from "../../../Components/SellerDashboardBox";

const page = () => {
  return (
    <div className="flex h-screen">
      <SellerDashboardBox />

      <main className="w-4/5 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Your Products
        </h2>
      </main>
    </div>
  );
};

export default page;
