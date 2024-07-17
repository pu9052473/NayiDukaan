"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUserData } from "@/context/Usercontext/UserDataContext";

const EditProfileForm = () => {

    const { state, EditUser } = useUserData();
    const { user } = state;
    if (state.error) {
        console.log(state.error);
    }
    if (state.loading) {
        return <>Loading...</>
    }

    const [name, setName] = useState(user?.name);
    const [address, setAddress] = useState(user?.address);
    const [city, setCity] = useState(user?.city);
    const [country, setCountry] = useState(user?.country);
    const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth);
    const [phone, setPhone] = useState(user?.phone);
    const [pincode, setPincode] = useState(user?.pincode);
    const [State, setState] = useState(user?.state);
    const [shopName, setShopName] = useState(user?.ShopName || "");
    const [shopAddress, setShopAddress] = useState(user?.ShopAddress || "");
    const [file, setFile] = useState(null);

    const handleFileChange = (e:any) => {
        setFile(e.target.files[0]);
    };
    // console.log(state)

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        let photoURL = user?.photo;

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
            uid: user?.uid,
        };

        if (user?.isSeller) {
            updatedData.ShopName = shopName;
            updatedData.ShopAddress = shopAddress;
        }

        try {
            await EditUser(updatedData);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile. Please try again.");
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
                    value={user?.email ?? ""}
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
                    value={State}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            {user?.isSeller && (
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
