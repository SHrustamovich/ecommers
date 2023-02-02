import { FC, useState, useEffect } from "react";
import { usePostRequest, usePutRequest } from "../../hooks/requies";
import { addbrands, editBrands, mediaAdd, mediaDelete } from "../../utils/urls";
import useLanguage from "../../hooks/useLanguage";
import { errorI } from "./CategoryMadal";
import { $mediaApi } from "../../utils/https";
import {
    Button,
    Drawer,
    Form,
    Input,
    message,
    Modal,
    Upload,
    UploadFile,
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { AES } from "crypto-ts";
import { brandMain, brandsListI } from "../../pages/types";

export const BrandsModal: FC<brandMain> = ({
    open,
    onClose,
    editBrandItem,
    clearInputBrands,
}) => {
    const [fileList, setFileList] = useState<UploadFile<errorI>[]>([]);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState("");

    const [form] = Form.useForm();

    const postBrandsRequest = usePostRequest<brandsListI>({ url: addbrands });

    const brandEditRequest = usePutRequest<brandsListI>({
        url: editBrands(editBrandItem?.id as number),
    });

    const clearInpurBrand = () => {
        onClose();
        form.resetFields();
        clearInputBrands();
    };

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
        setLoading(true);
        if (
            file.type == "image/jpeg" ||
            file.type == "image/png" ||
            file.type == "image/gif" ||
            file.type == "image/webp" ||
            file.type == "image/jpg"
        ) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("project", "ecommerce");

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

                form.setFieldValue("image", data.url);
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

    // post and edit
    const onFinish = async (e: any) => {
        const { name_uz, name_ru, image } = e;
        if (editBrandItem) {
            const { success, error } =
                await brandEditRequest.request<brandsListI>({
                    data: { name_uz, name_ru, image },
                });
            if (success) {
                onClose();
                message.success("Category update");
            }
            if (error) {
                onClose();
                message.error("error");
            }
        } else {
            const { success, error } = await postBrandsRequest.request({
                data: { name_uz, name_ru, image },
            });
            if (success) {
                onClose();
                message.success("Category create");
            }
            if (error) {
                onClose();
                message.error("error");
            }
        }
    };

    useEffect(() => {
        if (editBrandItem != null) {
            form.setFieldsValue(editBrandItem);
            setFileList([
                {
                    uid: editBrandItem.slug,
                    name: editBrandItem.name_uz,
                    status: "done",
                    url: editBrandItem.image,
                },
            ]);
        }
    }, [editBrandItem]);

    const translate = useLanguage();
    return (
        <>
            <Drawer
                title={translate("create_a_new_brand")}
                width={820}
                onClose={clearInpurBrand}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    id='myForm'
                    form={form}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item name='name_uz' rules={[{ required: true }]}>
                        <Input placeholder={`${translate("name")} uz`} />
                    </Form.Item>

                    <Form.Item name='name_ru' rules={[{ required: true }]}>
                        <Input placeholder={`${translate("name")} ru`} />
                    </Form.Item>

                    <Form.Item name='image'>
                        <Upload
                            listType='picture-card'
                            fileList={fileList}
                            customRequest={handlyChange}
                            onPreview={handlyPreview}
                            onRemove={handlyRemove}
                        >
                            {fileList.length === 1 ? null : uploadButton}
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

                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            {translate("submit")}
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};
