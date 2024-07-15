"use client";

import CustomerDashboardPagesAPI from "../API/CustomerDashboardPagesAPI";

import Link from "next/link";

import { usePathname } from "next/navigation";

const page = () => {
  const pathname = usePathname();

  const activePathClassName = "text-gray-950 font-medium";

  return (
    <>
      <aside className="w-1/5 bg-white p-4 drop-shadow-md ">
        <div className="text-center my-4 flex flex-col gap-4">
          <h2 className=" font-bold text-gray-900">Customer Profile</h2>

          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto"
          />

          <h3 className="text-xl font-semibold text-gray-900">
            Welcome {"  "}
            <b>Your Name !</b>
          </h3>
        </div>

        <nav className="mt-10">
          {CustomerDashboardPagesAPI.map((items) => (
            <Link
              key={items.title}
              href={items.href}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${pathname === `${items.href}` ? `${activePathClassName}` : ""
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
