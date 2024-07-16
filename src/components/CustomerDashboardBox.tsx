"use client";

import CustomerDashboardPagesAPI from "../API/CustomerDashboardPagesAPI";
import { User } from "@/types.index";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const user = localStorage.getItem("User") ?? "";
  const userObject: User = JSON.parse(user);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is seller
    if (userObject.isSeller) {
      window.location.href = "/SellerDashboard/MyProfile"
    }
  }, [])

  const activePathClassName = "text-gray-950 font-medium bg-theme2 ";

  return (
    <>
      <aside className="w-1/5 bg-theme3 p-7 drop-shadow-md ">
        <div className="text-center my-4 flex flex-col gap-4">
          <h2 className=" font-bold text-gray-900">Customer Profile</h2>

          <img
            src={userObject.photo}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mx-auto"
          />

          <h3 className="text-xl font-semibold text-gray-900">
            Welcome {"  "}
            <b>{userObject.name}</b>
          </h3>
        </div>

        <nav className="mt-10">
          {CustomerDashboardPagesAPI.map((items) => (
            <Link
              key={items.title}
              href={items.href}
              className={`flex items-center px-4 rounded-lg py-2 text-gray-700 hover:bg-theme2 ${pathname === `${items.href}` ? `${activePathClassName}` : ""
                }`}
            >
              {items.icon}

              <span className="ml-4">{items.title}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default page;
