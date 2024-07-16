"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { User } from "@/types.index";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { UpdateDocument } from "@/utils/EditData";

const EditProfileForm = () => {
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        // Checking if user is authenticated
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            // console.log(u);
            if (u) {
                setCurrentUser(u);
                const uRef = doc(db, "User", u.uid);
                const docSnap = await getDoc(uRef);

                if (!docSnap.exists()) {
                    console.log("No such document!");
                    window.location.href = "/Login"
                }
            } else {
                console.log("No user is signed in.");
            }
        });
        return () => unsubscribe();

    }, [])

    const UserFromLocalStorage = localStorage.getItem("User") || "";
    const user: User = JSON.parse(UserFromLocalStorage)

    const [name, setName] = useState(user?.name);
    const [address, setAddress] = useState(user?.address);
    const [city, setCity] = useState(user?.city);
    const [country, setCountry] = useState(user?.country);
    const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth);
    const [phone, setPhone] = useState(user?.phone);
    const [pincode, setPincode] = useState(user?.pincode);
    const [state, setState] = useState(user?.state);
    const [shopName, setShopName] = useState(user?.ShopName || "");
    const [shopAddress, setShopAddress] = useState(user?.ShopAddress || "");
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    // console.log(user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        let photoURL = user.photo;

        if (file) {
            const storage = getStorage();
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            photoURL = await getDownloadURL(storageRef);
        }

        const updatedData = {
            name,
            address,
            city,
            country,
            dateOfBirth,
            phone,
            pincode,
            state,
            photo: photoURL,
        };

        if (user.isSeller) {
            updatedData.ShopName = shopName;
            updatedData.ShopAddress = shopAddress;
        }

        try {
            // Update document in Firestore
            await UpdateDocument("User", user.uid, updatedData);

            // Update user details in Authentication
            const updateAuthProfile = updateProfile(currentUser, {
                displayName: updatedData.name,
                phoneNumber: updatedData.phone,
            });

            // Update User in local storage
            const updateLocalStorage = new Promise<void>((resolve) => {
                const localStorageUser = JSON.parse(localStorage.getItem('User') || '{}');
                const updatedLocalStorageUser = { ...localStorageUser, ...updatedData };
                localStorage.setItem('User', JSON.stringify(updatedLocalStorageUser));
                resolve();
            });

            // Waiting for all functions to be finished
            await Promise.all([updateAuthProfile, updateLocalStorage]);

            toast.success("Profile updated successfully!");

            window.location.reload()
        } catch (error) {
            toast.error("Error updating profile: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    value={name ?? ""}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            <div>
                <input
                    type="text"
                    value={user.email ?? ""}
                    placeholder="email"
                    disabled
                    className="w-full border cursor-not-allowed border-gray-300 p-2 rounded"
                />
            </div>
            <div>
                <input
                    type="text"
                    value={address ?? ""}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            <div>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            <div>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            <div>
                <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            <div>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            <div>
                <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Pincode"
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            <div>
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            {user.isSeller && (
                <>
                    <div>
                        <input
                            type="text"
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                            placeholder="Shop Name"
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={shopAddress}
                            onChange={(e) => setShopAddress(e.target.value)}
                            placeholder="Shop Address"
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                </>
            )}
            <div>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="border border-gray-300 p-2 rounded"
                />
            </div>
            <button
                type="submit"
                className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
            >
                Update Profile
            </button>
            <ToastContainer />
        </form>
    );
};

export default EditProfileForm;
