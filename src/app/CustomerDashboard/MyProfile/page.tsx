"use client";

import CustomerDashboardBox from "../../../Components/CustomerDashboardBox";
import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const userData = {
    Name: "abc abc",

    Email: "abc@abc.in",

    Address: "123 Main Street",

    Pincode: "123456",

    DateOfBirth: "00-00-0000",

    City: "Visnagar",

    State: "Gujarat",

    Country: "India",

    phone: "90000 00000",

    customer: "true",

    seller: "false",
};

const page = () => {
    const pathname = usePathname();

    const displayedUserData = Object.fromEntries(
        Object.entries(userData).filter(
            ([key]) => key !== "customer" && key !== "seller"
        )
    );

    return (
        <>
            <div className="flex h-screen">
                <CustomerDashboardBox />

                <main className="w-4/5 p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        Customer Profile Page
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
                    <Link href="/CustomerDashboard/MyProfile/EditProfile">
                        <Button variant="contained">Edit Profile</Button>
                    </Link>
                </main>
            </div>
        </>
    );
};

export default page;
