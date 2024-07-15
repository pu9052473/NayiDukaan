"use client";

import CustomerDashboardBox from "../../Components/CustomerDashboardBox";

const page = () => {
  return (
    <>
      <div className="flex h-screen">
        <CustomerDashboardBox />

        <main className="w-4/5 p-6"></main>
      </div>
    </>
  );
};

export default page;
