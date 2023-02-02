import { AllProducts } from "../pages/AllProducts";
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
        path: "/orders",
        component: Orders,
    },
    {
        id: 3,
        path: "/category",
        component: Categories,
    },
    {
        id: 4,
        path: "/pages",
        component: Pages,
    },
    {
        id: 5,
        path: "/brands",
        component: Brands,
    },
    {
        id: 6,
        path: "/banners",
        component: Banners,
    },
];
