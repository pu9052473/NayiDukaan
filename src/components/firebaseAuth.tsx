"use client";
import React, { useState } from "react";
import { auth, db } from "../firebase/config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

import MainBtn from "./MainBtn";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const FirebaseAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // New state for First Name
  const [lastName, setLastName] = useState(""); // New state for Last Name

  const handleEmailSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userObject = {
        name: firstName + " " + lastName,
        email: user.email || "",
        address: "",
        pincode: "",
        dateOfBirth: "",
        city: "",
        state: "",
        country: "",
        phone: "",
        isSeller: false,
        photo: "",
        uid: user.uid,
      };

      const docRef = await setDoc(doc(db, "User", userObject.uid), userObject);
      console.log("Document written with ID: ", docRef);

      localStorage.setItem("User", JSON.stringify(userObject));
      toast.success("Signed up successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error creating user or adding to Firestore: ", error);
      toast.error("Error: " + error.message);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const userData = userCredential.user;

      const userObject = {
        name: userData.displayName || "",
        email: userData.email || "",
        address: "",
        pincode: "",
        dateOfBirth: "",
        city: "",
        state: "",
        country: "",
        phone: "",
        isSeller: false,
        photo: userData.photoURL || "",
      };

      const docRef = await setDoc(doc(db, "User", userData.uid), userObject);
      console.log("Document written with ID: ", docRef);

      localStorage.setItem("User", JSON.stringify(userObject));
      toast.success("Signed up successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error(
        "Error signing in with Google or adding to Firestore: ",
        error
      );
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>

        <div className="mb-4">
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        <MainBtn
          value="Signup with Email"
          className="w-full py-2 mt-4 bg-colorOne text-white"
          onClickFunc={handleEmailSignup}
        />
        <MainBtn
          value="Signup with Google"
          logo={<FcGoogle className="h-5 w-5 cursor-pointer" />}
          className="w-full py-2 bg-colorThree mt-4 "
          onClickFunc={handleGoogleSignup}
        />

        <ToastContainer />
      </div>
    </div>
  );
};

export default FirebaseAuth;
