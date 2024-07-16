"use client";

import SellerDashboardBox from "@/Components/SellerDashboardBox";



const page = () => {
  return (
    <>
      <div className="flex h-screen">
        <SellerDashboardBox />

        <main className="w-4/5 p-6"></main>
      </div>
    </>
  );
};

export default page;
