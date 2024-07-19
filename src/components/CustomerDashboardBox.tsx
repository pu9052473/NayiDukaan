"use client";

import CustomerDashboardPagesAPI from "../API/CustomerDashboardPagesAPI";
import { User } from "@/types.index";
import Link from "next/link";

import { usePathname } from "next/navigation";

const page = () => {
  const user = localStorage.getItem("User");
  const userObject: User = JSON.parse(user);
  const pathname = usePathname();

  const cbLinksClassName =
    "flex items-center px-4 py-2 gap-2 transition-colors duration-200 ";

  const unActivePathClassNameCB =
    "text-gray-600 hover:text-colorOne hover:font-medium";
  const activePathClassNameCB =
    "text-white font-medium bg-colorOne hover:text-white rounded-lg";

  return (
    <>
      <aside className="w-1/5 shadow-lg  rounded-tr-3xl">
        <div className="text-center flex flex-col gap-4">
          <h1 className=" font-semibold text-gray-600 bg-colorThree rounded-tr-3xl p-2 shadow">
            Customer Dashboard
          </h1>
          <img
            src={userObject.photo}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mx-auto"
          />

          <h3 className="text-lg text-gray-900">
            Welcome {"  "}
            <b className="text-colorOne">{userObject.name}</b>
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
