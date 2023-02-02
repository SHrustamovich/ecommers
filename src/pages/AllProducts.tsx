import { FC, useState } from "react";
import { Button, message, Space, Table } from "antd";
import { useDeleteRequest, useLoad } from "../hooks/requies";
import { DeleteModal } from "../components/DeleteModal";
import { allproduct, deleteproductUrl } from "../utils/urls";
import useLanguage from "../hooks/useLanguage";
import OpenMadal from "../components/Drawers/ProductsMadal";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { PostProductI } from "../components/Drawers/types";

export interface DataType {
    id: null | number;
    name_uz: string;
    name_ru: string;
    image: string;
    price: string;
    description: string;
}

export interface PaginationI {
    current: number;
    next: number;
    per_page: number;
    previous: null;
    total: number;
    total_pages: number;
}

interface ProductListRequestI {
    products: PostProductI[];
    pagination: PaginationI;
}

const productItitials = {
    id: null,
    name_uz: "",
    name_ru: "",
    description_uz: "",
    description_ru: "",
    slug: "",
    category_id: null,
    brand_id: null,
    quantity: null,
    attributes: "",
    previous_price: null,
    price: null,
    image: "",
    images: "",
    discount: null,
};

export const AllProducts: FC = () => {
    const [open, setOpen] = useState(false);
    const [productItem, setProductItem] =
        useState<PostProductI>(productItitials);
    const [elementLoading, setElementLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editProductItem, setEditProductItem] = useState<PostProductI | null>(
        null
    );
    // translate
    const translate = useLanguage();
    const lacalLanguage = localStorage.getItem("language");
    const productRequest = useLoad<ProductListRequestI>({ url: allproduct });
    const { loading, response } = productRequest;
    // delete
    const deleteProdct = useDeleteRequest();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handlyProductEdit = (item: any) => {
        setEditProductItem(item);
        showDrawer();
    };
    const deletehandly = async () => {
        setElementLoading(true);
        const { success, error } = await deleteProdct.request({
            url: deleteproductUrl(productItem.id as number),
        });
        if (success) {
            setElementLoading(false);
            setIsModalOpen(false);
            await productRequest.request();
            message.success(`${translate("catedory_deleted")}`);
        }
        if (!success) {
            setElementLoading(false);
            setIsModalOpen(false);
            message.warning(error);
        }
    };
    const handlyDelete = (id: number) => {
        setProductItem({ ...productItem, id });
        setIsModalOpen(true);
    };
    const columns = [
        { title: `${translate("name")}`, dataIndex: "name_uz", key: "name_uz" },
        {
            title: `${translate("image")}`,
            dataIndex: "image",
            key: "image",
            render: (image: string) => <img width={70} src={image} />,
        },
        { title: `${translate("price")}`, dataIndex: "price" },
        {
            title: `${translate("action")}`,
            dataIndex: "",
            render: (record: any) => (
                <Space size={10}>
                    <Button onClick={() => handlyProductEdit(record)}>
                        <EditOutlined />
                    </Button>
                    <Button danger onClick={() => handlyDelete(record.id)}>
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='all-products'>
            <div className='category-add'>
                <Button
                    type='primary'
                    onClick={showDrawer}
                    icon={<PlusOutlined />}
                >
                    {translate("create_pruduct")}
                </Button>
            </div>
            <div className='open-madal'>
                <OpenMadal
                    onClose={onClose}
                    open={open}
                    editProductItem={editProductItem}
                />
            </div>
            <DeleteModal
                title={translate("d_product")}
                visible={isModalOpen}
                loading={elementLoading}
                onCancelHandler={() => setIsModalOpen(false)}
                onOkHandler={deletehandly}
            />
            <Table
                columns={columns}
                loading={loading}
                dataSource={response?.products?.map((item) => item)}
                pagination={false}
            />
        </div>
    );
};
