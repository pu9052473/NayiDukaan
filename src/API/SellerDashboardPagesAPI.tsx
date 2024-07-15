import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { FiPackage } from "react-icons/fi";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";

import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import WalletRoundedIcon from '@mui/icons-material/WalletRounded';

const iconClassName = "h-5 w-5 cursor-pointer";

const SellerDashboardPagesAPI = [
    {
        title: "Profile Details",

        href: "/SellerDashboard/MyProfile",

        icon: <PersonRoundedIcon className={iconClassName} />,
    },

    {
        title: ".....",

        href: "/SellerDashboard/MyProfile/",

        icon: <FiPackage className={iconClassName} />,
    },

    {
        title: ".....",

        href: "/SellerDashboard/MyProfile/",

        icon: <ShoppingCartRoundedIcon className={iconClassName} />,
    },

    {
        title: "......",

        href: "/CustomerDashboard/MyProfile/",

        icon: <FavoriteBorderRoundedIcon className={iconClassName} />,
    },

    {
        title: "Edit Profile",

        href: "/CustomerDashboard/MyProfile/EditProfile",

        icon: <ModeEditRoundedIcon className={iconClassName} />,
    },
    {
        title: ".......",

        href: "/CustomerDashboard/MyProfile/",

        icon: <WalletRoundedIcon className={iconClassName} />,
    },


    {
        title: "Setting",

        href: "/SellerDashboard/Setting",

        icon: <SettingsOutlinedIcon className={iconClassName} />,
    },
];

export default SellerDashboardPagesAPI;
