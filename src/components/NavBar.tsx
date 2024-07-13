"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import { GoPackageDependents } from "react-icons/go";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from '@mui/icons-material/Logout';
// Assuming you have an icon library imported

const NavBar = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const UserData = localStorage.getItem("User") ?? null;
        if (UserData) {
            setLoggedInUser(JSON.parse(UserData));
        }
    }, []);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };
    const setFalse = () => {
        setMenuOpen(false)
    }
    const handleSetUserNull = () => {
        setLoggedInUser(null);
        setFalse();
    }

    return (
        <div className="h-20 bg-white flex justify-between items-center px-10 shadow-lg">
            <Link onClick={setFalse} href="/" className="text-2xl font-bold">
                Nayi Dukaan
            </Link>
            <div className="categories flex items-center gap-10">
                <Link
                    href="/"
                    className="hover:text-gray-500 transition-colors duration-200"
                >
                    Home
                </Link>
                <Link
                    href="/"
                    className="hover:text-gray-500 transition-colors duration-200"
                >
                    Category
                </Link>
                <Link
                    href="/"
                    className="hover:text-gray-500 transition-colors duration-200"
                >
                    Contact Us
                </Link>
                <Link
                    href="/"
                    className="hover:text-gray-500 transition-colors duration-200"
                >
                    Wishlist
                </Link>
            </div>
            <div className="flex items-center">
                {loggedInUser && (
                    <div className="relative flex items-center">
                        <div className="cursor-pointer "
                            onClick={handleMenuToggle}
                        >

                            Hy, {loggedInUser.displayName}
                            {"  "}
                            <AccountCircleIcon
                                className="h-6 w-6 ml-1"
                            />
                        </div>

                        {menuOpen && (
                            <div className="absolute top-10 right-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
                                <Link onClick={handleMenuToggle}
                                    href="/CustomerDashboard/MyProfile"
                                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex gap-2"
                                >
                                    Profile Details{" "}
                                    <PersonIcon className="h-5 w-5 cursor-pointer" />
                                </Link>
                                <Link onClick={handleMenuToggle}
                                    href="/CustomerDashboard/MyProfile/MyOrders"
                                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex gap-2"
                                >
                                    My Orders
                                    <GoPackageDependents className="h-5 w-5 cursor-pointer" />
                                </Link>
                                <Link onClick={handleMenuToggle}
                                    href="/CustomerDashboard/MyProfile/MyCart"
                                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex gap-2"
                                >
                                    My Cart{" "}
                                    <ShoppingCartIcon className="h-5 w-5 cursor-pointer" />
                                </Link>
                                <Link onClick={handleMenuToggle}
                                    href="/CustomerDashboard/MyProfile/Wishlist"
                                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex gap-2"
                                >
                                    Wishlist{" "}
                                    <ShoppingCartIcon className="h-5 w-5 cursor-pointer" />
                                </Link>
                                <Link onClick={handleMenuToggle}
                                    href="/CustomerDashboard/MyProfile/EditProfile"
                                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex gap-2"
                                >
                                    Edit Profile <EditIcon className="h-5 w-5 cursor-pointer" />
                                </Link>
                                <Link onClick={handleMenuToggle}
                                    href="/CustomerDashboard/Setting"
                                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex gap-2"
                                >
                                    Setting <SettingsIcon className="h-5 w-5 cursor-pointer" />
                                </Link>
                                <Link
                                    href="/Logout"
                                    onClick={handleSetUserNull}
                                    className="px-4 py-2 text-red-500 hover:bg-gray-100 flex gap-2"
                                >
                                    Logout <LogoutIcon className=" h-5 w-5 cursor-pointer" />
                                </Link>
                            </div>
                        )}
                    </div>
                )}
                {!loggedInUser && (
                    <Link href="/Login" >
                        Log In <LoginIcon className="h-6 w-6 cursor-pointer" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;