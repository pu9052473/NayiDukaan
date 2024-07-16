"use client";

import { User } from "@/types.index";
import SellerDashboardPagesAPI from "../API/SellerDashboardPagesAPI";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SellerDashboardBox = () => {
  const pathname = usePathname();
  const user = localStorage.getItem("User") ?? "";
  const userObject: User = JSON.parse(user);
  useEffect(() => {
    if (!userObject.isSeller) {
      window.location.href = "/CustomerDashboard/MyProfile"
    }
  }, [])

  const activePathClassName = "text-gray-950 font-medium bg-theme2";

  return (
    <>
      <aside className="w-1/5 bg-theme3 p-7 drop-shadow-md ">
        <div className="text-center my-4 flex flex-col gap-4">
          <h2 className=" font-bold text-gray-900">Seller Profile</h2>

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
          {SellerDashboardPagesAPI.map((items) => (
            <Link
              key={items.title}
              href={items.href}
              className={`flex items-center px-4 rounded-lg py-2  text-gray-700 hover:bg-theme2 ${pathname === `${items.href}` ? `${activePathClassName}` : ""
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

export default SellerDashboardBox;
