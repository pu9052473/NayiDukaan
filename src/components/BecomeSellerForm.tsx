"use client";
import { User } from '@/app/types';
import { UpdateDocument } from '@/utils/EditData';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BecomeSellerForm = () => {
    const [ShopAddress, setShopAddress] = useState("");
    const [ShopName, setShopName] = useState("");

    const userData = localStorage.getItem("User") ?? "";
    const user: User = JSON.parse(userData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // We will update data to localstorage as well as firestore
        const updatedData = {
            ShopName: ShopName,
            ShopAddress: ShopAddress,
            isSeller: true
        };

        try {
            // Update document in Firestore
            await UpdateDocument("User", user.uid, updatedData);

            // Update User in local storage
            const updateLocalStorage = new Promise<void>((resolve) => {
                const localStorageUser = JSON.parse(localStorage.getItem('User') || '{}');
                const updatedLocalStorageUser = { ...localStorageUser, ...updatedData };
                localStorage.setItem('User', JSON.stringify(updatedLocalStorageUser));
                resolve();
            });

            // Waiting for all functions to be finished
            await Promise.all([updateLocalStorage]);

            toast.success("You are now a seller!");

            window.location.href = "/SellerDashboard";
        } catch (error) {
            toast.error("Error while becoming a seller: " + error.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 4,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2
                }}
            >
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Become a Seller
                </Typography>

                <TextField
                    label="Shop Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={ShopName}
                    onChange={(e) => setShopName(e.target.value)}
                />

                <TextField
                    label="Shop Address"
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    value={ShopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                />

                <Button variant="contained" type="submit" fullWidth>
                    Become a Seller
                </Button>
            </Box>
            <ToastContainer />
        </Container>
    );
};

export default BecomeSellerForm;
