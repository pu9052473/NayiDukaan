import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { TbListDetails } from "react-icons/tb";

import { TbShoppingBagPlus } from "react-icons/tb";

import { TbShoppingBagEdit } from "react-icons/tb";

import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";

const iconClassName = "h-5 w-5 cursor-pointer";

const SellerDashboardPagesAPI = [
    {
        title: "Profile Details",

        href: "/SellerDashboard/MyProfile",

        icon: <PersonRoundedIcon className={iconClassName} />,
    },

    {
        title: "Your Products",

        href: "/SellerDashboard/Products",

        icon: <TbListDetails className={iconClassName} />,
    },

    {
        title: "Add Products",

        href: "/SellerDashboard/Products/AddProducts",

        icon: <TbShoppingBagPlus className={iconClassName} />,
    },

    {
        title: "Edit Products",

        href: "/SellerDashboard/Products/Edit$id",

        icon: <TbShoppingBagEdit className={iconClassName} />,
    },

    {
        title: "Analytics",

        href: "/SellerDashboard/Analytics",

        icon: <AnalyticsRoundedIcon className={iconClassName} />,
    },
    {
        title: "Edit Profile",

        href: "/SellerDashboard/MyProfile/EditProfile",

        icon: <ModeEditRoundedIcon className={iconClassName} />,
    },

    {
        title: "Setting",

        href: "/SellerDashboard/Setting",

        icon: <SettingsOutlinedIcon className={iconClassName} />,
    },
];

export default SellerDashboardPagesAPI;
