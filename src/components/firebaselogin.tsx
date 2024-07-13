// "use client";
// import { useEffect } from 'react';
// import { auth } from '../firebase/config'; // Import initialized auth
// import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'; // Import auth providers
// import * as firebaseui from 'firebaseui';
// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
// import 'firebaseui/dist/firebaseui.css';

// const FirebaseLogin = () => {
//     useEffect(() => {
//         const uiConfig = {
//             signInSuccessUrl: '/', // Redirect to the home page after successful sign-in
//             signInOptions: [
//                 EmailAuthProvider.PROVIDER_ID,
//                 GoogleAuthProvider.PROVIDER_ID,
//             ],
//         };

//         const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
//         ui.start('#firebaseui-auth-container', uiConfig);
//     }, []);

//     return (
//         <div>
//             <h1>Login</h1>
//             <div id="firebaseui-auth-container"></div>
//         </div>
//     );
// };

// export default FirebaseLogin;


"use client";
import { useEffect } from 'react';
import { auth, GoogleAuthProvider } from '../firebase/config';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { signInWithPopup } from 'firebase/auth';
import 'firebaseui/dist/firebaseui.css';
import CustomButton from './CustomButton';

const FirebaseLogin = () => {
    const [signInWithEmailAndPassword, userEmail, loadingEmail, errorEmail] = useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        if (userEmail) {
            localStorage.setItem("User", JSON.stringify(userEmail.user));
            window.location.href = '/';
        }
    }, [userEmail]);

    const handleEmailLogin = async () => {
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        try {
            const result = await signInWithEmailAndPassword(email, password);
            console.log(result);
            localStorage.setItem("User", JSON.stringify(result?.user));
            window.location.href = '/';
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            localStorage.setItem("User", JSON.stringify(result.user));
            window.location.href = '/';
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                <div className="mb-4">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <CustomButton title='Login With Email' containerStyles='bg-blue-500 mt-5 text-white w-full py-2 rounded hover:bg-blue-600 transition' handleClick={handleEmailLogin} btn_type='button' />

                <CustomButton title='Login With Google' containerStyles='bg-red-500 mt-5 text-white w-full py-2 rounded hover:bg-blue-600 transition' handleClick={handleGoogleLogin} btn_type='button' />

                {loadingEmail && <p className="text-center mt-4">Loading...</p>}
                {errorEmail && <p className="text-red-500 text-center mt-4">{errorEmail.message}</p>}
            </div>
        </div>
    );
};

export default FirebaseLogin;