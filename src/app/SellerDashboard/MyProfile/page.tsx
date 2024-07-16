"use client";

import { useEffect, useState } from "react";
import { User } from "@/types.index";
import { Button } from "@mui/material";
import Link from "next/link";
import SellerDashboardBox from "@/Components/SellerDashboardBox";

const page = () => {
    const [userData, setUserData] = useState<User>({});

    useEffect(() => {
        const UserFromLocalStorage = localStorage.getItem("User") ?? "";
        const user = JSON.parse(UserFromLocalStorage);
        console.log(user);
        setUserData(user);
    }, []);

    const hiddenKeys = ["isSeller", "uid", "photo"];

    const displayedUserData = Object.fromEntries(
        Object.entries(userData).filter(
            ([key]) => !hiddenKeys.includes(key)
        )
    );

    return (
        <>
            <div className="flex h-screen">
                <SellerDashboardBox />

                <main className="w-4/5 p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        Seller Profile Page
                    </h2>

                    <div className="flex items-center space-x-6">
                        <div>
                            <ul className="mt-4 space-y-2 text-gray-700">
                                {Object.entries(displayedUserData).map(([key, value]) => (
                                    <li key={key} className="capitalize">
                                        <b>{key} :</b> {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Link href="/SellerDashboard/MyProfile/EditProfile">
                        <Button variant="contained">Edit Profile</Button>
                    </Link>
                </main>
            </div>
        </>
    );
};

export default page;
