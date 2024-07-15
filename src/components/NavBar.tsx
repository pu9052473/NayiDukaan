"use client";

import Link from "next/link";

import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import LoginIcon from "@mui/icons-material/Login";

import LogoutIcon from "@mui/icons-material/Logout";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import NavBarHemburgMenuAPI from "../API/NavBarHemburgMenuAPI";

import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

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
        "text-gray-600 flex items-center gap-1 hover:text-gray-950 transition-colors duration-200";

    const activePathClassName = "text-gray-950 font-medium";

    return (
        <div className="h-20 w-screen bg-white flex justify-evenly items-center drop-shadow-md">
            <Link onClick={setFalse} href="/" className="text-2xl font-bold w-1/10 ">
                Nayi Dukaan
            </Link>

            <div className="categories flex items-center gap-7 w-2/3">
                <div className="relative w-1/2 flex items-evenly rounded-lg bg-gray-100 focus:border-gray-500 border-gray-300">
                    <button className=" w-1/12 place-content-center rounded-lg bg-gray-100 focus:outline-none">
                        <SearchRoundedIcon className="h-5 w-5" />
                    </button>

                    <input
                        type="text"
                        placeholder="Search for products"
                        onClick={setFalse}
                        className="w-full py-2 px-4 bg-gray-100 focus:outline-none rounded-lg "
                    />
                </div>

                <Link
                    href="/CustomerDashboard/MyProfile/Wishlist"
                    onClick={setFalse}
                    className={`${navBarLinksClassName} ${pathname === "/CustomerDashboard/MyProfile/Wishlist"
                        ? `${activePathClassName}`
                        : ""
                        }`}
                >
                    Wishlist
                </Link>

                <Link
                    href="/BecomeSellerForm"
                    onClick={setFalse}
                    className={`${navBarLinksClassName} ${pathname === "/BecomeSellerForm" ? `${activePathClassName}` : ""
                        }`}
                >
                    <StorefrontRoundedIcon className="h-5 w-5" />
                    Become a Seller
                </Link>
            </div>

            <div className="flex items-center w-1/10">
                {loggedInUser && (
                    <div className="relative flex  items-center ">
                        <div
                            className="cursor-pointer flex align-middle gap-2 "
                            onClick={handleMenuToggle}
                        >
                            <AccountCircleIcon className="h-6 w-6 " />
                            Hy, {loggedInUser.name}
                        </div>

                        {menuOpen && (
                            <div className="absolute top-10 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                {NavBarHemburgMenuAPI.map((item) => {
                                    return (
                                        <Link
                                            onClick={handleMenuToggle}
                                            href={item.href}
                                            className={` ${navBarLinksClassName}  px-4 py-2 flex gap-2 hover:bg-gray-100 ${pathname === item.href ? `${activePathClassName}` : ""
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
                                    className="text-red-600 item-center transition-colors duration-200 px-4 py-2 flex gap-2 hover:bg-gray-100 "
                                >
                                    <LogoutIcon className=" h-5 w-5 cursor-pointer" />
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {!loggedInUser && (
                    <Link
                        href="/Login"
                        className=" text-gray-950 font-medium item-center transition-colors duration-200 px-4 py-2 flex gap-2 hover:text-gray-700"
                    >
                        Log In
                        <LoginIcon className="h-6 w-6 cursor-pointer" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;
