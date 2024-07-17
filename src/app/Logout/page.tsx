"use client";

import { useUserData } from "@/context/Usercontext/UserDataContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();
  const { logoutUser } = useUserData();

  useEffect(() => {
    const logout = async () => {
      await logoutUser();
      router.push("/Login");
    };
    logout();
  }, [logoutUser, router]);

  return <>Loading...</>;
};

export default LogoutPage;
