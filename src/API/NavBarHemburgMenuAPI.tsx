import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { FiPackage } from "react-icons/fi";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";

import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded";

const iconClassName = "h-5 w-5 cursor-pointer";

const user = localStorage.getItem("User") ?? "";
let UserData;
if (user) {
    UserData = JSON.parse(user);
}
console.log(UserData)
const NavBarHemburgMenuAPI = [
    {
        title: "Profile Details",

        href: `/${UserData?.isSeller ? "SellerDashboard" : "CustomerDashboard"}/MyProfile`,

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

        href: `/${UserData?.isSeller ? "SellerDashboard" : "CustomerDashboard"}/MyProfile/EditProfile`,

        icon: <ModeEditRoundedIcon className={iconClassName} />,
    },

    {
        title: "Customer Care",

        href: "/CustomerDashboard/CustomerCare",

        icon: <HeadsetMicRoundedIcon className={iconClassName} />,
    },

    {
        title: "Setting",

        href: `/${UserData?.isSeller ? "SellerDashboard" : "CustomerDashboard"}/Setting`,

        icon: <SettingsOutlinedIcon className={iconClassName} />,
    },
];

export default NavBarHemburgMenuAPI;
