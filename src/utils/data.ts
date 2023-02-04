import {
    ApartmentOutlined,
    ShoppingOutlined,
    AppstoreOutlined,
    FundViewOutlined,
    CrownOutlined,
    ReadOutlined,
} from "@ant-design/icons";

export const sidebarData = [
    {
        id: 1,
        title: "products",
        icon: AppstoreOutlined,
        path: "/",
        active: "",
        link: [
            {
                id: 2,
                title: "products",
                icon: AppstoreOutlined,
                path: "/",
            },
            {
                id: 3,
                title: "atributs",
                icon: AppstoreOutlined,
                path: "/atribut",
            },
            {
                id: 4,
                title: "product",
                icon: AppstoreOutlined,
                path: "/product",
            },
        ],
    },
    {
        id: 5,
        title: "orders",
        icon: ShoppingOutlined,
        path: "/orders",
        active: "",
        link: [],
    },
    {
        id: 6,
        title: "categories",
        icon: ApartmentOutlined,
        path: "/category",
        active: "",
        link: [],
    },
    {
        id: 7,
        title: "pages",
        icon: FundViewOutlined,
        path: "/pages",
        active: "",
        link: [],
    },
    {
        id: 8,
        title: "brands",
        icon: CrownOutlined,
        path: "/brands",
        active: "",
        link: [],
    },
    {
        id: 9,
        title: "banners",
        icon: ReadOutlined,
        path: "/banners",
        active: "",
        link: [],
    },
];

