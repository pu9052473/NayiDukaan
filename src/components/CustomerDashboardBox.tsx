"use client";

import { useUserData } from "@/context/Usercontext/UserDataContext";
import CustomerDashboardPagesAPI from "../API/CustomerDashboardPagesAPI";
import Link from "next/link";

import { usePathname } from "next/navigation";

const page = () => {
  const { state } = useUserData()
  const { user } = state;
  const pathname = usePathname();

  if (state.error) {
    console.log(state.error);
  }
  if (state.loading) {
    return <>Loading...</>
  }

  // Check if user is seller
  if (user?.isSeller && user) {
    window.location.href = "/SellerDashboard/MyProfile"
  }

  const cbLinksClassName =
    "flex items-center px-4 py-2 gap-2 transition-colors duration-200 ";

  const unActivePathClassNameCB =
    "text-gray-600 hover:text-colorOne hover:font-medium";
  const activePathClassNameCB =
    "text-white font-medium bg-colorOne hover:text-white rounded-lg";
  return (
    <>
      <aside className="w-1/5 bg-theme3 p-7 drop-shadow-md ">
        <div className="text-center my-4 flex flex-col gap-4">
          <h2 className=" font-bold text-gray-900">
            {user?.isSeller == true ? "Sellers Profile" : "Customer Profile"}
          </h2>

          <img
            src={user?.photo}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mx-auto"
          />

          <h3 className="text-lg text-gray-900">
            Welcome {"  "}
            <b>{user?.name}</b>
          </h3>
        </div>

        <nav className="m-5">
          {CustomerDashboardPagesAPI.map((items) => (
            <Link
              key={items.title}
              href={items.href}
              className={`${cbLinksClassName} ${
                pathname === `${items.href}`
                  ? `${activePathClassNameCB}`
                  : ` ${unActivePathClassNameCB}`
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
