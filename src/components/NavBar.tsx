"use client";

import Link from "next/link";

import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";

import MainBtn from "./MainBtn";

import { usePathname } from "next/navigation";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import LoginIcon from "@mui/icons-material/Login";

import LogoutIcon from "@mui/icons-material/Logout";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import NavBarHemburgMenuAPI from "../API/NavBarHemburgMenuAPI";

import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

import tailwindConfig from "../../tailwind.config";

const NavBar = () => {
  const pathname = usePathname();

  const [loggedInUser, setLoggedInUser] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const UserData = localStorage.getItem("User") ?? null;

    if (UserData != null) {
      setLoggedInUser(JSON.parse(UserData));
    }
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const setFalse = () => {
    setMenuOpen(false);
  };

  const handleSetUserNull = () => {
    setLoggedInUser(null);

    setFalse();
  };

  const navBarLinksClassName =
    "flex items-center px-4 py-2 gap-2 transition-colors duration-200 ";

  const activePathClassNameHemBurg =
    " font-medium text-white bg-colorOne rounded-lg ";
  const unActivePathClassNameHemBurg =
    "text-gray-600 hover:text-colorOne hover:font-medium";
  const activePathClassNameNavBar = "text-colorOne font-medium";

  return (
    <div className="h-20 w-screen bg-theme3 flex justify-evenly items-center">
      <Link
        onClick={setFalse}
        href="/"
        className="text-2xl font-bold w-1/10 text-colorOne"
      >
        Nayi Dukaan
      </Link>

      <div className="categories flex items-center gap-7 w-2/3">
        <div className="relative w-1/2 flex items-evenly rounded-lg bg-colorThree focus:border-gray-500 border-gray-300">
          <button className=" w-1/12 place-content-center rounded-lg bg-colorThree focus:outline-none">
            <SearchRoundedIcon className="h-5 w-5" />
          </button>

          <input
            type="text"
            placeholder="Search for products"
            onClick={setFalse}
            className="w-full py-2 px-4 bg-colorThree focus:outline-none rounded-lg "
          />
        </div>

        <Link
          href="/BecomeSellerForm"
          onClick={setFalse}
          className={`${navBarLinksClassName} ${
            pathname === "/BecomeSellerForm"
              ? `${activePathClassNameNavBar}`
              : ` ${unActivePathClassNameHemBurg}`
          }`}
        >
          <StorefrontRoundedIcon className="h-5 w-5" />
          Become a Seller
        </Link>
      </div>

      <div className="flex items-center w-1/10">
        {loggedInUser && (
          <div className="relative flex  items-center ">
            <MainBtn
              value={` Hy, ${loggedInUser.name}`}
              logo={<AccountCircleIcon className="h-6 w-6" />}
              className={` flex align-middle p-2  ${
                menuOpen ? "bg-colorThree " : "bg-colorOne text-white"
              }`}
              onClickFunc={handleMenuToggle}
            />

            {menuOpen && (
              <div className="absolute top-10 right-0 mt-2 w-60 p-2 bg-colorThree rounded-lg shadow-lg z-10">
                {NavBarHemburgMenuAPI.map((item) => {
                  return (
                    <Link
                      onClick={handleMenuToggle}
                      href={item.href}
                      className={` ${navBarLinksClassName}   ${
                        pathname === item.href
                          ? `${activePathClassNameHemBurg}`
                          : ` ${unActivePathClassNameHemBurg}`
                      }`}
                      key={item.href}
                    >
                      {item.icon}

                      {item.title}
                    </Link>
                  );
                })}

                <Link
                  href="/Logout"
                  onClick={handleSetUserNull}
                  className="text-red-500 item-center transition-colors duration-200 px-4 py-2 rounded-lg flex gap-2 hover:text-red-600 hover:font-medium"
                >
                  <LogoutIcon className=" h-5 w-5 cursor-pointer" />
                  Logout
                </Link>
              </div>
            )}
          </div>
        )}

        {!loggedInUser && (
          <Link href="/Login">
            <MainBtn
              value="Login"
              logo={<LoginIcon className="h-6 w-6 cursor-pointer" />}
              className=" py-2 bg-colorThree mt-4 "
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
