"use client";

import { useUserData } from "@/context/Usercontext/UserDataContext";
import Link from "next/link";

import { usePathname } from "next/navigation";
import SellerDashboardPagesAPI from "@/API/SellerDashboardPagesAPI";

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
  if (!user?.isSeller && user) {
    window.location.href = "/CustomerDashboard/MyProfile"
  }

  const activePathClassName = "text-gray-950 font-medium bg-theme2 ";

  return (
    <>
      <aside className="w-1/5 bg-theme3 p-7 drop-shadow-md ">
        <div className="text-center my-4 flex flex-col gap-4">
          <h2 className=" font-bold text-gray-900">
            Seller Profile
          </h2>

          <img
            src={user?.photo}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mx-auto"
          />

          <h3 className="text-xl font-semibold text-gray-900">
            Welcome {"  "}
            <b>{user?.name}</b>
          </h3>
        </div>

        <nav className="mt-10">
          {SellerDashboardPagesAPI.map((items) => (
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
