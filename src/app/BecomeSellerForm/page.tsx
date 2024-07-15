import React from "react";
import SellerDashboard from "../SellerDashboard/page";
import Link from "next/link";
import Button from "@mui/material/Button";
const page = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Seller Form Coming soon </h3>
        <Link href="/SellerDashboard" className="">
          <Button variant="contained">Go To Seller Dashboard</Button>
        </Link>
    </div>
  );
};

export default page;
