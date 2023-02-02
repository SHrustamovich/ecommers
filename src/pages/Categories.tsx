import { FC, useState } from "react";
import { Button, Drawer, message, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import useLanguage from "../hooks/useLanguage";
import { useDeleteRequest, useLoad } from "../hooks/requies";
import { categoryI, categoryArrayI } from "../components/Drawers/types";
import { CategoryMadal } from "../components/Drawers/CategoryMadal";
import { DeleteModal } from "../components/DeleteModal";
import { categoryList, deleteCategoryUrl } from "../utils/urls";

const categoryInitials = {
    id: null,
    name_uz: "",
    name_ru: "",
    image: "",
    slug: "",
    parent_id: null,
};

export const Categories: FC = () => {
    const [open, setOpen] = useState(false);
    const [categoryItem, setCategoryItem] =
        useState<categoryArrayI>(categoryInitials);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [elementLoading, setElementLoading] = useState(false);
    const [editDataValue, setEditDataValue] = useState<categoryArrayI | null>(
        null
    );

    const translate = useLanguage();

    const categoryRequest = useLoad<categoryI>({ url: categoryList });
    const categoryDelete = useDeleteRequest();
    const { loading, response } = categoryRequest;

    const openDriver = () => {
        setOpen(true);
    };

    const closeDriver = () => {
        setOpen(false);
        setEditDataValue(null);
    };

    async function editCategoryData(editData: any) {
        setEditDataValue(editData);
        openDriver();
    }

    const deleteHandly = async () => {
        setElementLoading(true);
        const { success, error } = await categoryDelete.request({
            url: deleteCategoryUrl(categoryItem?.id as number),
        });
        if (success) {
            setElementLoading(false);
            setIsModalOpen(false);
            await categoryRequest.request();
            message.success(`${translate("catedory_deleted")}`);
        } else {
            setElementLoading(false);
            setIsModalOpen(false);
            message.warning(error);
        }
    };

    const deleteCategoryhandly = (id: number) => {
        setCategoryItem({ ...categoryItem, id });
        setIsModalOpen(true);
    };

    const columns = [
        { title: `${translate("name")}`, dataIndex: "name_uz", key: "name_uz" },
        {
            title: `${translate("action")}`,
            dataIndex: "action",
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
        <div className='orders'>
            <div className='category-add'>
                <Button
                    type='primary'
                    onClick={openDriver}
                    icon={<PlusOutlined />}
                >
                    {translate("create_category")}
                </Button>
            </div>
            {open && (
                <Drawer
                    title={translate("create_a_new_category")}
                    width={820}
                    onClose={closeDriver}
                    open={open}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <CategoryMadal
                        editData={editDataValue}
                        elementLoading={elementLoading}
                        closeDriver={closeDriver}
                    />
                </Drawer>
            )}

            <DeleteModal
                title={translate("want_cate")}
                visible={isModalOpen}
                loading={elementLoading}
                onCancelHandler={() => setIsModalOpen(false)}
                onOkHandler={deleteHandly}
            />
            <Table
                columns={columns}
                loading={loading}
                dataSource={response?.categories?.map((item) => item)}
                pagination={false}
            />
        </div>
    );
};
