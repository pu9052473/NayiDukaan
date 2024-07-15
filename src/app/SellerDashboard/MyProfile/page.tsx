"use client";

import SellerDashboardBox from "../../../Components/SellerDashboardBox";

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
    const displayedUserData = Object.fromEntries(
        Object.entries(userData).filter(
            ([key]) => key !== "customer" && key !== "seller"
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
                </main>
            </div>
        </>
    );
};

export default page;
