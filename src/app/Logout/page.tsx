"use client";

import { auth } from "@/firebase/config";

import { signOut } from "firebase/auth";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    logout();
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

  return <>Loading...</>;
};

export default page;
