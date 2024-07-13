"use client";
import { useEffect, useState } from "react";

import { Client } from "appwrite";

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6690f891001602127c87"); // Replace with your project ID

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
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await client.account.get();
                setUser(response);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    const displayedUserData = Object.fromEntries(
        Object.entries(userData).filter(
            ([key]) => key !== "customer" && key !== "seller"
        )
    );

    return (
        <>
            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold">
                        {userData.customer ? `Customer Profile` : `Seller Profile`}
                    </h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Profile Page</h2>

                <div className="flex items-center space-x-6">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full border-2 border-gray-300"
                    />

                    <div>
                        <h3 className="text-xl font-semibold">
                            <b>Welcome </b>

                            {userData.Name}
                        </h3>

                        <ul className="mt-4 space-y-2">
                            {Object.entries(displayedUserData).map(([key, value]) => (
                                <li key={key} className="text-gray-600">
                                    <b className="capitalize">{key} :</b> {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
