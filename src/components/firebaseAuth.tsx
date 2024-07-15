"use client";

import React, { useState } from "react";
import { auth, db } from "../firebase/config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";
import { addDoc, collection } from "firebase/firestore";

const FirebaseAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userObject = {
        name: "",
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

      const docRef = await addDoc(collection(db, "User"), userObject);
      console.log("Document written with ID: ", docRef.id);

      const userWithId = { ...userObject, id: docRef.id };
      localStorage.setItem("User", JSON.stringify(userWithId));

      toast.success("Signed up successfully!");
      window.location.href = "/"
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
        uid: userData.uid,
      };

      const docRef = await addDoc(collection(db, "User"), userObject);
      console.log("Document written with ID: ", docRef.id);

      const userWithId = { ...userObject, id: docRef.id };
      localStorage.setItem("User", JSON.stringify(userWithId));

      toast.success("Signed up successfully!");
      window.location.href = "/"

    } catch (error) {
      console.error("Error signing in with Google or adding to Firestore: ", error);
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>

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

        <button
          onClick={handleEmailSignup}
          className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-900 transition-colors duration-200 shadow-md"
        >
          Signup with Email
        </button>

        <button
          onClick={handleGoogleSignup}
          className="w-full py-2 rounded mt-4 transition-colors duration-200 shadow-md"
        >
          <FcGoogle className="inline-block ml-2" /> Signup with Google
        </button>

        <ToastContainer />
      </div>
    </div>
  );
};

export default FirebaseAuth;
