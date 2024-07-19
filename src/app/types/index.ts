import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string,
    containerStyles?: string,
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btn_type?: "button" | "submit";
    textStyles?: string;
    rightIcon?: string
    isDisabled?: boolean;
}

export interface Product {
    id?: string;
    productName: string;
    description: string;
    category: string;
    price: number;
    productImage: string;
    sellerId: string;
}
export interface User {
    address: string,
    city: string,
    country: string,
    dateOfBirth: string,
    email: string,
    isSeller: boolean,
    name: string,
    phone: string
    photo: string,
    pincode: string,
    state: string,
    uid: string,
    ShopName?: string,
    ShopAddress?: string,
}