"use client";
import { useEffect, useState } from "react";
import CustomerDashboardBox from "../../../Components/CustomerDashboardBox";
import { User } from "@/types.index";
import { Button } from "@mui/material";
import Link from "next/link";
import { useUserData } from "@/context/Usercontext/UserDataContext";
import tailwindConfig from "../../../../tailwind.config";
import { FaUserEdit } from "react-icons/fa";

const Page = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const { state } = useUserData();
  const { user, loading, error } = state;

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const hiddenKeys = ["isSeller", "uid", "photo"];
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("User");
    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      console.log(user);
      setUserData(user);
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const displayedUserData = Object.fromEntries(
    Object.entries(userData).filter(([key]) => !hiddenKeys.includes(key))
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
            <ul className="mt-4 space-y-2 text-gray-700">
              {Object.entries(displayedUserData).map(([key, value]) => (
                <li key={key} className="capitalize">
                  <b>{key} :</b>{" "}
                  {typeof value === "object" ? JSON.stringify(value) : value}
                </li>
              ))}
            </ul>
          </div>

          <Link href="/CustomerDashboard/MyProfile/EditProfile">
            <Button
              variant="contained"
              sx={{
                backgroundColor: tailwindConfig.theme.extend.colors.colorThree,
                textTransform: "none",
                "&:hover": {
                  color: "white",
                  backgroundColor: tailwindConfig.theme.extend.colors.colorOne,
                },
              }}
              className="font-medium text-gray-600 rounded-lg mt-10 gap-2 text-base shadow-md"
            >
              <FaUserEdit className="h-5 w-5 cursor-pointer" />
              Edit Profile
            </Button>
          </Link>
        </main>
      </div>
    </>
  );
};

export default Page;
