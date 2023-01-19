import {
    ApartmentOutlined,
    ShoppingOutlined,
    AppstoreOutlined,
    FundViewOutlined,
    CrownOutlined,
    ReadOutlined
} from '@ant-design/icons';
export const sidebarData = [
	{
		id: 1,
		title: 'Products',
		icon: AppstoreOutlined,
		path: '/',
		active: '',
		link: [
            {
                id: 2,
                title: 'Products',
                icon: AppstoreOutlined,
                path: '/', 
            },
            {
                id: 3,
                title: 'Atributs',
                icon: AppstoreOutlined,
                path: '/atribut', 
            },
            {
                id: 4,
                title: 'Product',
                icon: AppstoreOutlined,
                path: '/product', 
            }
        ],
	},
	{
		id: 5,
		title: 'Orders',
		icon: ShoppingOutlined,
		path: '/orders',
		active: '',
		link: [],
	},
	{
		id: 6,
		title: 'Categores',
		icon: ApartmentOutlined,
		path: '/category',
		active: '',
		link: [],
	},
	{
		id: 7,
		title: 'Pages',
		icon: FundViewOutlined,
		path: '/pages',
		active: '',
		link: [],
	},
	{
		id: 8,
		title: 'Brands',
		icon: CrownOutlined,
		path: '/brands',
		active: '',
		link: [],
	},
	{
		id: 9,
		title: 'Banners',
		icon: ReadOutlined,
		path: '/banners',
		active: '',
		link: [],
	}
]


