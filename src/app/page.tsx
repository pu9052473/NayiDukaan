"use client";

import { useUserData } from "@/context/Usercontext/UserDataContext";

export interface User {
  email: string;
  name: string;
}

const Page = () => {
  const { state } = useUserData();
  const { user, error } = state;

  // console.log("User from Home Page:", state);
  if (error) {
    console.log(error)
  }
  if (state.loading) {
    return (<></>)
  }
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      This is Home Page
      {user && <div>Welcome, {user.name}</div>}
    </div>
  );
};

export default Page;
