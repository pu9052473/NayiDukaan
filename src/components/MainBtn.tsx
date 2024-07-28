import React from "react";
import { Button } from "@mui/material";
import tailwindConfig from "../../tailwind.config";

const MainBtn = ( props ) => {
    return (
        <>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: tailwindConfig.theme.extend.colors.colorThree,
                    color: "black",
                    textTransform: "none",
                    "&:hover": {
                        color: "white",
                        backgroundColor: tailwindConfig.theme.extend.colors.colorOne,
                    },
                }}
                className={`${props.className} text-gray-700 rounded-md transition-colors duration-500 shadow gap-2 font-medium`}
                onClick={props.onClickFunc}
            >
                {props.logo} {"  "}
                {props.value}
            </Button>
        </>
    );
};

export default MainBtn;
