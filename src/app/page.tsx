"use client";
import LandingPage from "@/components/LandingPage";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface User {
  email: string;
  name: string;
}

const Page = () => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("User");
    // Check if user data exists in localStorage
    if (userData) {
      const user = JSON.parse(userData);
      setLoggedInUser(user);
      console.log("Logged in user:", user); // Log user data here
    }
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("User");
      router.push("/Login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  if (loggedInUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
        <p>Logged in as {loggedInUser.email}</p>
        <button className="bg-red-500 text-white p-2 rounded" type="button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-300">
      This is Home Page
    </div>
  );
};

export default Page;
