import React, { useEffect, useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import {
    Col,
    InputNumber,
    message,
    Modal,
    Row,
    Upload,
    UploadFile,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useLoad, usePostRequest } from "../../hooks/requies";
import { Button, Drawer, Form, Input, Select } from "antd";
import {
    addproduct,
    barndsList,
    categoryList,
    mediaAdd,
    mediaDelete,
} from "../../utils/urls";
import { brandsI, categoryI, PostProductI } from "./types";
import useLanguage from "../../hooks/useLanguage";
import { errorI } from "./CategoryMadal";
import { AES } from "crypto-ts";
import { $mediaApi } from "../../utils/https";
import { ProductProps } from "../../pages/types";

const OpenMadal: React.FC<ProductProps> = ({
    onClose,
    open,
    editProductItem,
}) => {
    const [fileList, setFileList] = useState<UploadFile<errorI>[]>([]);
    const [loadingi, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    // categoryId
    const categoryRequest = useLoad<categoryI>({ url: categoryList });
    const { loading, response } = categoryRequest;
    const categoryId = response;
    // brandsId
    const breandsRequest = useLoad<brandsI>({ url: barndsList });
    // add product
    const postProductRequest = usePostRequest<PostProductI>({
        url: addproduct,
    });

    const postProductImages = usePostRequest({
        url: mediaAdd as string,
    });

    // translate
    const translate = useLanguage();
    const localProduct = localStorage.getItem("language");

    const [form] = Form.useForm();

    const handlyEncrypted = () => {
        return AES.encrypt(
            JSON.stringify({
                client: "ecommerce",
                secret: "gCosGwTqCNCpIoGnS28V7TfD2V0obDbPaJSY6LvmN7Lg0XPl5Rt6ne9vdbwL+Q",
                time: Date.now(),
            }),
            "G2DPdL0RN2ldSRuKpnWSRlfZrzBBEtc0qhZ+xQaRjjdTZdV89bausl1KR6l1SkqY"
        ).toString();
    };

    const handleCancel = () => setPreviewOpen(false);

    const handlySelectCategory = (value: string) => {
        form.setFieldValue("category_id", value);
    };

    const handlySelectBrand = (value: string) => {
        form.setFieldValue("brand_id",value) ;
    };
    const handlyPreview = async (file: any) => {
        setPreviewImage(file.url);
        setPreviewOpen(true);
        setPreviewTitle(file.url.substring(file.url.lastIndexOf("/") + 1));
    };

    const handlyRemove = async (file: any) => {
        const { url, status } = file;
        if (status == "error") {
            setFileList([]);
        }
        const urlObj = new URL(url);
        const deleteImage = urlObj.pathname.slice(1);
        const encrypted = handlyEncrypted();

        const headers = {
            "x-auth-key": encrypted,
        };

        try {
            const deleteRes = await $mediaApi.post(
                mediaDelete,
                {
                    key: deleteImage,
                },
                {
                    headers,
                }
            );
            if (!!deleteRes.data) {
                setFileList([]);
            }
        } catch (err) {
            message.error("error");
        } finally {
            setLoading(false);
        }
    };

    const handlyChange = async ({ file }: any) => {
        if (
            file.type == "image/jpeg" ||
            file.type == "image/png" ||
            file.type == "image/gif" ||
            file.type == "image/webp" ||
            file.type == "image/jpg"
        ) {
            const formData = new FormData();
            formData.append("project", "ecommerce");
            formData.append("file", file);
            const encrypted = handlyEncrypted();
            const headers = {
                "x-auth-key": encrypted,
            };
            try {
                const mediaAddRequest = await $mediaApi.post(
                    mediaAdd,
                    formData,
                    {
                        headers,
                    }
                );
                const data = mediaAddRequest.data;
                setFileList([
                    ...fileList,
                    {
                        uid: data.id,
                        status: "done",
                        url: data.url,
                        name: file.name,
                    },
                ]);
            } catch (err) {
                setFileList([
                    ...fileList,
                    {
                        uid: file.id,
                        status: "error",
                        url: file.url,
                        name: file.name,
                    },
                ]);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
            setFileList([
                {
                    uid: file.uid,
                    name: file.name,
                    status: "error",
                },
            ]);
            return message.error("You can only upload JPG/PNG file!");
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const onFinish = async (e: any) => {
        const {
            name_uz,
            name_ru,
            slug,
            description_uz,
            description_ru,
            category_id,
            brand_id,
            attributes,
            discount,
            price,
            previous_price,
            quantity,
            image,
        } = e;
        const { success, error } =
            await postProductRequest.request<PostProductI>({
                data: {
                    name_uz,
                    name_ru,
                    slug,
                    description_uz,
                    description_ru,
                    category_id,
                    brand_id,
                    attributes,
                    discount,
                    price,
                    previous_price,
                    quantity,
                    image: fileList[0].url,
                    images: fileList.map((item) => item.url).join(","),
                },
            });
        if (success) {
            onClose();
            message.success("Product crate");
        }
        if (error) {
            onClose();
            message.error("error");
        }
    };
    useEffect(() => {
        if (editProductItem != null) {
            form.setFieldsValue(editProductItem);
            setFileList([
                {
                    uid: editProductItem.name_uz,
                    name: editProductItem.name_uz,
                    status: 'done',
                    url:editProductItem.image
                }
            ])
        }
    }, [editProductItem]);

    return (
        <>
            <Drawer
                title={translate("create_a_new_product")}
                width={920}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form onFinish={onFinish} form={form}>
                    <Row>
                        <Col>
                            <Form.Item>
                                <Button type='primary' htmlType='submit'>
                                    {translate("submit")}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{ marginRight: "20px" }}>
                            <Form.Item
                                name='name_uz'
                                rules={[{ required: true }]}
                            >
                                <Input
                                    placeholder={translate("product_name_uz")}
                                />
                            </Form.Item>
                            <Form.Item
                                name='name_ru'
                                rules={[{ required: true }]}
                            >
                                <Input
                                    placeholder={translate("product_name_ru")}
                                />
                            </Form.Item>
                            <Form.Item name='slug' rules={[{ required: true }]}>
                                <Input placeholder={translate("slug")} />
                            </Form.Item>
                            <Form.Item
                                name='description_uz'
                                rules={[{ required: true }]}
                            >
                                <TextArea
                                    placeholder={translate("description_uz")}
                                />
                            </Form.Item>
                            <Form.Item
                                name='description_ru'
                                rules={[{ required: true }]}
                            >
                                <TextArea
                                    placeholder={translate("description_ru")}
                                />
                            </Form.Item>
                            <Form.Item
                                name='category_id'
                                rules={[{ required: true }]}
                            >
                                {
                                    <Select
                                        placeholder={translate(
                                            "select_category"
                                        )}
                                        style={{ width: 220 }}
                                        onChange={handlySelectCategory}
                                        options={categoryId?.categories.map(
                                            (item) => ({
                                                value: item.id,
                                                label:
                                                    localProduct == "uz"
                                                        ? item.name_uz
                                                        : item.name_ru,
                                            })
                                        )}
                                    />
                                }
                            </Form.Item>
                            <Form.Item
                                name='brand_id'
                                rules={[{ required: true }]}
                            >
                                {
                                    <Select
                                        placeholder={translate("select_brand")}
                                        style={{ width: 220 }}
                                        onChange={handlySelectBrand}
                                        options={breandsRequest.response?.brands.map(
                                            (item) => ({
                                                value: item.id,
                                                label:
                                                    localProduct == "uz"
                                                        ? item.name_uz
                                                        : item.name_ru,
                                            })
                                        )}
                                    />
                                }
                            </Form.Item>
                            <Form.Item
                                name='attributes'
                                rules={[{ required: true }]}
                            >
                                <Input placeholder={translate("attributes")} />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name='discount'
                                rules={[{ required: true }]}
                            >
                                <InputNumber
                                    placeholder={translate("discount")}
                                />
                            </Form.Item>
                            <Form.Item
                                name='price'
                                rules={[{ required: true }]}
                            >
                                <InputNumber
                                    style={{ width: "200px" }}
                                    placeholder={translate("price")}
                                />
                            </Form.Item>
                            <Form.Item
                                name='previous_price'
                                rules={[{ required: true }]}
                            >
                                <InputNumber
                                    style={{ width: "200px" }}
                                    placeholder={translate("previos_price")}
                                />
                            </Form.Item>
                            <Form.Item
                                name='quantity'
                                rules={[{ required: true }]}
                            >
                                <InputNumber
                                    style={{ width: "200px" }}
                                    placeholder={translate("quantity")}
                                />
                            </Form.Item>
                            <Form.Item name='image'>
                                <Upload
                                    listType='picture-card'
                                    fileList={fileList}
                                    customRequest={handlyChange}
                                    onPreview={handlyPreview}
                                    onRemove={handlyRemove}
                                >
                                    {uploadButton}
                                </Upload>
                                <Modal
                                    open={previewOpen}
                                    title={previewTitle}
                                    footer={null}
                                    onCancel={handleCancel}
                                >
                                    <img
                                        alt='example'
                                        style={{ width: "100%" }}
                                        src={previewImage}
                                    />
                                </Modal>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default OpenMadal;
