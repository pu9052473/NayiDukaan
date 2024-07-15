"use client";

import { useEffect } from "react";

import { auth } from "../firebase/config";

import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";

import * as firebaseui from "firebaseui";

import "firebaseui/dist/firebaseui.css";

const FirebaseAuth = () => {
  useEffect(() => {
    const uiConfig = {
      signInSuccessUrl: "/", 

      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,

        GoogleAuthProvider.PROVIDER_ID,
      ],
    };

    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    <div>
      <h1>Login / Signup</h1>

      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default FirebaseAuth;
