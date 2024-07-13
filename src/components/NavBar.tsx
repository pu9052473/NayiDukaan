"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const NavBar = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const UserData = localStorage.getItem("User") ?? "";
        // Check if user data exists in localStorage
        if (UserData) {
            setLoggedInUser(JSON.parse(UserData));
            // console.log(UserData)
        }

        // console.log("loggedInUser", UserData);
    }, []);


    return (
        <div className='h-20 bg-gray-400 flex justify-around items-center'>
            <Link href={"/"} className="text-2xl text-  black">ShopEase</Link>
            <div className="categories flex items-center gap-5">
                <Link href={"/men"}>Men</Link>
            </div>
            {loggedInUser ? <div className="text-black">Hii, {loggedInUser.displayName}</div>
                : <Link href={"Login"}>Login </Link>
            }
        </div>
    )
}

export default NavBar
