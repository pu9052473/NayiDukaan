"use client";

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

    if (userData) {
      const user = JSON.parse(userData);

      setLoggedInUser(user);

      console.log("Logged in user:", user);
    }
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        This is Home Page
      </div>
    </>
  );
};

export default Page;
