import { FC } from "react";
import { Button, Space, Table } from 'antd';
import { useLoad } from "../hooks/requies";
import { allproduct } from "../utils/urls";
import OpenMadal from "../components/Drawers/ProductsMadal";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import useLanguage from "../hooks/useLanguage";

interface DataType {
    id: null | number;
    name_uz: string;
    name_ru:string
    image: string;
    price: string;
    description: string;
}

export interface PaginationI {
    current: number
    next: number
    per_page: number
    previous: null
    total: number
    total_pages: number

}

interface ProductListRequestI {
    products: DataType[],
    pagination: PaginationI
}

export const AllProducts: FC = () => {
    const translate = useLanguage()
    const lacalLanguage = localStorage.getItem("language")
    const productRequest = useLoad<ProductListRequestI>({ url: allproduct })
    const { loading, response } = productRequest

    const columns = [
        { title: `${translate('name')}`, dataIndex: 'name' },
        { title: `${translate('image')}`, dataIndex: 'image', render: (image: string) => <img width={70} src={image} /> },
        { title: `${translate('price')}`, dataIndex: 'price' },
        {
            title: `${translate('action')}`,
            dataIndex: '',
            render: () => (
                <Space size={10}>
                    <Button>
                        <EditOutlined />
                    </Button>
                    <Button danger>
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="all-products">
            <div className="open-madal"> <OpenMadal /></div>
            <Table
                columns={columns}
                loading={loading}
                dataSource={response?.products?.map((item) => ({
                    key: item.id,
                    id: item.id,
                    name: lacalLanguage == 'uz' ? item.name_uz : item.name_ru,
                    image: item.image,
                    price: item.price
                }))}
                pagination={response?.pagination}
            />
        </div>
    )
}