"use client";

import { useUserData } from "@/context/Usercontext/UserDataContext";
import Link from "next/link";

import { usePathname } from "next/navigation";
import SellerDashboardPagesAPI from "@/API/SellerDashboardPagesAPI";

const SellerDashboardBox = () => {
  const { state } = useUserData();
  const { user } = state;
  const pathname = usePathname();

  if (state.error) {
    console.log(state.error);
  }
  if (state.loading) {
    return <>Loading...</>;
  }

  // Check if user is seller
  if (!user?.isSeller && user) {
    window.location.href = "/CustomerDashboard/MyProfile";
  }

  const sbLinksClassName =
    "flex items-center px-4 py-2 gap-2 transition-colors duration-200 ";

  const unActivePathClassNameSB =
    "text-gray-600 hover:text-colorOne hover:font-medium";
  const activePathClassNameSB =
    "text-white font-medium bg-colorOne hover:text-white rounded-lg";

  return (
    <>
      <aside className="w-1/5 shadow-lg  rounded-tr-3xl">
        <div className="text-center flex flex-col gap-4">
          <h1 className=" font-semibold text-gray-600 bg-colorThree rounded-tr-3xl p-2 shadow">
            Seller Dashboard
          </h1>
          <img
            src={user?.photo}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mx-auto"
          />

          <h3 className="text-lg text-gray-900">
            Welcome {"  "}
            {/* <b className="text-colorOne">{user.name}</b> */}
          </h3>
        </div>

        <nav className="m-5">
          {SellerDashboardPagesAPI.map((items) => (
            <Link
              key={items.title}
              href={items.href}
              className={`${sbLinksClassName} ${
                pathname === `${items.href}`
                  ? `${activePathClassNameSB}`
                  : ` ${unActivePathClassNameSB}`
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
