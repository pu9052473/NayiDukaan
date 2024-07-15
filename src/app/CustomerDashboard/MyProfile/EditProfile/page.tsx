import React from "react";

import CustomerDashboardBox from "../../../../Components/CustomerDashboardBox";

const page = () => {
  return (
    <div className="flex h-screen">
      <CustomerDashboardBox />

      <main className="w-4/5 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Edit Profile
        </h2>
      </main>
    </div>
  );
};

export default page;
