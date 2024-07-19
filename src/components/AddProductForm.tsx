"use client";
import React, { useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUserData } from "@/context/Usercontext/UserDataContext";
import { Product } from "@/app/types";
import { AddDataToFirestore } from "@/utils/AddData";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddProductForm: React.FC = () => {
    const { state } = useUserData()
    const { user } = state;
    // console.log("user frm: ", user);


    const [productData, setProductData] = useState<Product>({
        productName: "",
        description: "",
        category: "",
        price: 0,
        productImage: "",
        sellerId: "",
    });
    const [file, setFile] = useState<File | null>(null);



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            if (user) {
                setProductData({ ...productData, sellerId: user.uid })
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setProductData({ ...productData, category: e.target.value as string });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (file) {
            const storage = getStorage();
            const storageRef = ref(storage, `images/products/${file.name}`);
            await uploadBytes(storageRef, file);
            const productImage = await getDownloadURL(storageRef);

            const finalProductData = { ...productData, productImage };

            await AddDataToFirestore("Products", finalProductData);
            toast.success("Product Created success full");
            console.log("Product added successfully: ", finalProductData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>
                Add New Product
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label="Product Name"
                        name="productName"
                        value={productData.productName}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={productData.category}
                            onChange={handleCategoryChange}
                            fullWidth
                            required
                        >
                            <MenuItem value="Electronics">Electronics</MenuItem>
                            <MenuItem value="Clothing">Clothing</MenuItem>
                            <MenuItem value="Books">Books</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={productData.price}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" component="label">
                        Upload Image
                        <input type="file" hidden onChange={handleFileChange} required />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Add Product
                    </Button>
                </Grid>
            </Grid>
            <ToastContainer />
        </form>
    );
};

export default AddProductForm;
