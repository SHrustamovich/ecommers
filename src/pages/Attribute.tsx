import { Button, message, Space, Table } from "antd";
import { FC, useState } from "react";
import useLanguage from "../hooks/useLanguage";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDeleteRequest, useLoad } from "../hooks/requies";
import { attributeDelete, attributeList } from "../utils/urls";
import { attributeMain, attributes } from "./types";
import { AttributeModal } from "../components/Drawers/AttributeModal";
import { DeleteModal } from "../components/DeleteModal";

const attributeInitials = {
    id: null,
    is_filterable: null,
    slug: "",
    name_uz: "",
    name_ru: "",
    attributeValues: [],
};

export const Attribute: FC = () => {
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [elementLoading, setElementLoading] = useState(false);
    const [attributeItem, setAttributeItem] =
        useState<attributes>(attributeInitials);
    const [editAttribute, setEditAttribute] = useState<attributes | null>(null);

    const ListAttribute = useLoad<attributeMain>({ url: attributeList });
    const { loading, response } = ListAttribute;

    const deleteAttributeRequest = useDeleteRequest();
    const translate = useLanguage();
    // const localAttribut = localStorage.getItem('language')

    const openDriver = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const editCategoryData = (item: any) => {
        setEditAttribute(item);
        openDriver();
    };

    const deleteBrandHandly = async () => {
        setElementLoading(true);
        const { success, error } = await deleteAttributeRequest.request({
            url: attributeDelete(attributeItem?.id as number),
        });
        if (success) {
            setElementLoading(false);
            setIsModalOpen(false);
            await ListAttribute.request();
            message.success(`${translate("catedory_deleted")}`);
        } else {
            setElementLoading(false);
            setIsModalOpen(false);
            message.warning(error);
        }
    };
    const deleteCategoryhandly = (id: number) => {
        setAttributeItem({ ...attributeItem, id });
        setIsModalOpen(true);
    };

    const columns = [
        { title: `${translate("name")}`, dataIndex: "name_uz", key: "name_uz" },
        {
            title: `${translate("action")}`,
            render: (record: any) => {
                return (
                    <Space size={10}>
                        <Button onClick={() => editCategoryData(record)}>
                            <EditOutlined />
                        </Button>
                        <Button
                            danger
                            onClick={() => deleteCategoryhandly(record.id)}
                        >
                            <DeleteOutlined />
                        </Button>
                    </Space>
                );
            },
        },
    ];
    return (
        <div className='attribut'>
            <div className='category-add'>
                <Button
                    type='primary'
                    onClick={openDriver}
                    icon={<PlusOutlined />}
                >
                    {translate("create_attribute")}
                </Button>
            </div>
            <AttributeModal
                open={open}
                onClose={onClose}
                editAttribute={editAttribute}
            />
            <DeleteModal
                title={translate("want_att")}
                visible={isModalOpen}
                loading={elementLoading}
                onCancelHandler={() => setIsModalOpen(false)}
                onOkHandler={deleteBrandHandly}
            />
            <Table
                columns={columns}
                loading={loading}
                dataSource={response?.attributes?.map((item) => item)}
            />
        </div>
    );
};
