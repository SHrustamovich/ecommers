import { AllProducts } from "../pages/AllProducts";
import { Attribute } from "../pages/Attribute";
import { Banners } from "../pages/Banners";
import { Brands } from "../pages/Brands";
import { Categories } from "../pages/Categories";
import { Orders } from "../pages/Orders";
import { Pages } from "../pages/Pages";

export const routes = [
    {
        id: 1,
        path: "/",
        component: AllProducts,
    },
    {
        id: 2,
        path: "atribut",
        component: Attribute,
    },
    {
        id: 3,
        path: "/product",
        component: AllProducts,
    },
    {
        id: 4,
        path: "/orders",
        component: Orders,
    },
    {
        id: 5,
        path: "/category",
        component: Categories,
    },
    {
        id: 6,
        path: "/pages",
        component: Pages,
    },
    {
        id: 7,
        path: "/brands",
        component: Brands,
    },
    {
        id: 8,
        path: "/banners",
        component: Banners,
    },
];
