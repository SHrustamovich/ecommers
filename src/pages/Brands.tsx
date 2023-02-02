import { Button, Card, message } from "antd";
import { FC, useState } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useDeleteRequest, useLoad, usePutRequest } from "../hooks/requies";
import { brandsI, brandsListI } from "./types";
import { barndsList, deleteBrands } from "../utils/urls";
import { BrandsModal } from "../components/Drawers/BrandsModal";
import { brandsArrayI } from "../components/Drawers/types";
import { DeleteModal } from "../components/DeleteModal";
import useLanguage from "../hooks/useLanguage";

const brandInitials = {
    id: null,
    name_uz: "",
    name_ru: "",
    image: "",
};

export const Brands: FC = () => {
    const [open, setOpen] = useState(false);
    const [elementLoading, setElementLoading] = useState(false);
    const [brandItem, setBrandItem] = useState<brandsArrayI>(brandInitials);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editBrandItem, setEditBrandItem] = useState<brandsListI | null>(
        null
    );
    const brandsList = useLoad<brandsI>({ url: barndsList });
    const { loading, response } = brandsList;
    const brandDeleteRequest = useDeleteRequest();

    const localBrands = localStorage.getItem("language");
    const translate = useLanguage();


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const clearInputBrands = () => {
        setEditBrandItem(null)
    }

    const editBrand = (item: brandsListI) => {
        setEditBrandItem(item);
        showDrawer();
    };

    const deleteBrandHandly = async () => {
        setElementLoading(true);
        const { success, error } = await brandDeleteRequest.request({
            url: deleteBrands(brandItem.id as number),
        });
        if (success) {
            setElementLoading(false);
            setIsModalOpen(false);
            await brandsList.request();
            message.success(`${translate("brand_deleted")}`);
        } else {
            setElementLoading(false);
            setIsModalOpen(false);
            message.warning(error);
        }
    };

    const deleteBrand = async (id: number) => {
        setBrandItem({ ...brandItem, id });
        setIsModalOpen(true);
    };
    return (
        <div className='orders'>
            <div className='category-add'>
                <Button
                    type='primary'
                    onClick={showDrawer}
                    icon={<PlusOutlined />}
                >
                    {translate("create_brand")}
                </Button>
            </div>
            <div className='open-madal'>
                <BrandsModal
                    open={open}
                    onClose={onClose}
                    editBrandItem={editBrandItem}
                    clearInputBrands = {clearInputBrands}
                />
            </div>
            <div className='brand-cards'>
                {response?.brands.map((item) => (
                    <Card
                        key={item.id}
                        style={{ width: 300, margin: 20 }}
                        cover={<img src={item.image} alt='' />}
                        actions={[
                            <EditOutlined
                                key='edit'
                                onClick={() => editBrand(item)}
                            />,
                            <DeleteOutlined
                                key='delete'
                                onClick={() => deleteBrand(item.id)}
                            />,
                        ]}
                    >
                        <Meta
                            title={
                                localBrands == "uz"
                                    ? item.name_uz
                                    : item.name_ru
                            }
                            description={item.slug}
                        />
                    </Card>
                ))}
            </div>
            <DeleteModal
                title={translate("want_cate")}
                visible={isModalOpen}
                loading={elementLoading}
                onCancelHandler={() => setIsModalOpen(false)}
                onOkHandler={deleteBrandHandly}
            />
        </div>
    );
};
