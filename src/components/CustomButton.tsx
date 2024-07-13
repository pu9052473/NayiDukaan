"use client"
import { CustomButtonProps } from "@/app/types"
import Image from "next/image"

const CustomButton = ({ title, containerStyles, handleClick, btn_type, textStyles, rightIcon, }: CustomButtonProps) => {
    return (
        <button className={`custom-btn ${containerStyles}`} onClick={handleClick} disabled={false} type={btn_type || "button"}>
            <span className={`flex-1 ${textStyles}`}>{title}</span>
            {rightIcon && (
                <div className="relative w-6 h-6">
                    <Image src={rightIcon} alt="right-icon" className="object-contain" fill />
                </div>
            )}
        </button>
    )
}

export default CustomButton
