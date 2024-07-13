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
