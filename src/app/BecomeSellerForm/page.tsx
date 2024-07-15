import React from "react";
import SellerDashboard from "../SellerDashboard/page";
import Link from "next/link";
const page = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Link href="/SellerDashboard" className="">
        Seller Form
      </Link>
    </div>
  );
};

export default page;
