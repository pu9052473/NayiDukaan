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
    id: string;
    productName: string;
    description: string;
    category: string;
    price: number;
    productImage: string;
    sellerId: string;
}