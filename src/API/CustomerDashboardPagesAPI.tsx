import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { FiPackage } from "react-icons/fi";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";

import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import WalletRoundedIcon from '@mui/icons-material/WalletRounded';

const iconClassName = "h-5 w-5 cursor-pointer";

const CustomerDashboardPagesAPI = [
    {
        title: "Profile Details",

        href: "/CustomerDashboard/MyProfile",

        icon: <PersonRoundedIcon className={iconClassName} />,
    },

    {
        title: "My Orders",

        href: "/CustomerDashboard/MyProfile/MyOrders",

        icon: <FiPackage className={iconClassName} />,
    },

    {
        title: "My Cart",

        href: "/CustomerDashboard/MyProfile/MyCart",

        icon: <ShoppingCartRoundedIcon className={iconClassName} />,
    },

    {
        title: "Wishlist",

        href: "/CustomerDashboard/MyProfile/Wishlist",

        icon: <FavoriteBorderRoundedIcon className={iconClassName} />,
    },

    {
        title: "Edit Profile",

        href: "/CustomerDashboard/MyProfile/EditProfile",

        icon: <ModeEditRoundedIcon className={iconClassName} />,
    },
    {
        title: "Wallet",

        href: "/CustomerDashboard/MyProfile/Wallet",

        icon: <WalletRoundedIcon className={iconClassName} />,
    },


    {
        title: "Setting",

        href: "/CustomerDashboard/Setting",

        icon: <SettingsOutlinedIcon className={iconClassName} />,
    },
];

export default CustomerDashboardPagesAPI;
