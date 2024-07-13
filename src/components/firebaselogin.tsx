"use client";

import { useEffect } from "react";
import { auth, GoogleAuthProvider } from "../firebase/config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "firebaseui/dist/firebaseui.css";
import { FcGoogle } from "react-icons/fc";

const FirebaseLogin = () => {
    const [signInWithEmailAndPassword, userEmail, loadingEmail, errorEmail] =
        useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        if (userEmail) {
            localStorage.setItem("User", JSON.stringify(userEmail.user));
            window.location.href = "/";
        }
    }, [userEmail]);

    useEffect(() => {
        if (errorEmail) {
            toast.error("Login failed: Email ID does not exist.");
        }
    }, [errorEmail]);

    const handleEmailLogin = async () => {
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement)
            .value;

        try {
            if (!errorEmail) {
                const result = await signInWithEmailAndPassword(email, password);
                localStorage.setItem("User", JSON.stringify(result?.user));
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            localStorage.setItem("User", JSON.stringify(result.user));
            window.location.href = "/";
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                <div className="mb-4">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    />
                </div>
                <button
                    onClick={handleEmailLogin}
                    className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-900 transition-colors duration-200 shadow-md"
                >
                    Login with Email
                </button>
                <button
                    onClick={handleGoogleLogin}
                    className=" w-full py-2 rounded mt-4 transition-colors duration-200 shadow-md"
                >
                    <FcGoogle className="inline-block ml-2" /> Login with Google{" "}
                </button>
                {loadingEmail && <p className="text-center mt-4">Loading...</p>}
                <ToastContainer />
            </div>
        </div>
    );
};

export default FirebaseLogin;
