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
import { useUserData } from "@/context/Usercontext/UserDataContext";

const NavBar = () => {
    const pathname = usePathname();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);


    const { state } = useUserData();
    const { user } = state;
    console.log(user)
    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const setFalse = () => {
        setMenuOpen(false);
    };

    const handleSetUserNull = () => {
        setLoggedInUser(null);
        localStorage.removeItem("User");
        setFalse();
    };

    const navBarLinksClassName = "text-gray-600 flex items-center gap-1 hover:text-gray-950 transition-colors duration-200";
    const activePathClassNameNavBar = "text-gray-950 font-medium";
    const activePathClassNameHemBurg = "text-gray-950 font-medium bg-theme2";
    if (state.loading) {
        return <>Loading...</>
    }
    if (state.error) {
        console.log(state.error)
    }
    return (
        <div className="h-20 w-screen bg-theme3 flex justify-evenly items-center">
            <Link onClick={setFalse} href="/" className="text-2xl font-bold w-1/10 ">
                Nayi Dukaan
            </Link>

            <div className="categories flex items-center gap-7 w-2/3">
                <div className="relative w-1/2 flex items-evenly rounded-lg bg-theme2 focus:border-gray-500 border-gray-300">
                    <button className=" w-1/12 place-content-center rounded-lg bg-theme2 focus:outline-none">
                        <SearchRoundedIcon className="h-5 w-5" />
                    </button>
                    <input
                        type="text"
                        placeholder="Search for products"
                        onClick={setFalse}
                        className="w-full py-2 px-4 bg-theme2 focus:outline-none rounded-lg "
                    />
                </div>

                <Link
                    href="/BecomeSellerForm"
                    onClick={setFalse}
                    className={`${navBarLinksClassName} ${pathname === "/BecomeSellerForm" ? activePathClassNameNavBar : ""}`}
                >
                    <StorefrontRoundedIcon className="h-5 w-5" />
                    Become a Seller
                </Link>
            </div>

            <div className="flex items-center w-1/10">
                {user ? (
                    <div className="relative flex items-center">
                        <div
                            className="cursor-pointer flex align-middle gap-2"
                            onClick={handleMenuToggle}
                        >
                            <AccountCircleIcon className="h-6 w-6" />
                            Hi, {user.name}
                        </div>

                        {menuOpen && (
                            <div className="absolute top-10 right-0 mt-2 w-60 p-2 bg-white rounded-lg shadow-lg z-10">
                                {NavBarHemburgMenuAPI.map((item) => (
                                    <Link
                                        onClick={handleMenuToggle}
                                        href={item.href}
                                        className={`${navBarLinksClassName} px-4 py-2 flex gap-2 hover:bg-theme2 rounded-lg ${pathname === item.href ? activePathClassNameHemBurg : ""}`}
                                        key={item.href}
                                    >
                                        {item.icon}
                                        {item.title}
                                    </Link>
                                ))}

                                <Link
                                    href="/Logout"
                                    onClick={handleSetUserNull}
                                    className="text-red-600 item-center transition-colors duration-200 px-4 py-2 rounded-lg flex gap-2 hover:bg-theme2"
                                >
                                    <LogoutIcon className="h-5 w-5 cursor-pointer" />
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        href="/Login"
                        className="text-gray-950 font-medium item-center transition-colors duration-200 px-4 py-2 flex gap-2 hover:text-gray-700"
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
