import { FC, useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, message, Modal, Upload } from "antd";
import { $mediaApi } from "../../utils/https";
import {
    addCategoryUrl,
    editCategoryUrl,
    mediaAdd,
    mediaDelete,
} from "../../utils/urls";
import { usePostRequest, usePutRequest } from "../../hooks/requies";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import useLanguage from "../../hooks/useLanguage";
import type { UploadFile } from "antd/es/upload/interface";
import { AES } from "crypto-ts";
import { categoryEdit } from "../../pages/types";

export interface errorI {
    uid: number;
    name: string;
    status: string;
    url: string;
}
interface finishI {
    name_uz: string;
    name_ru: string;
    slug: string;
    catImage: string;
    parent_id: string;
}

export const CategoryMadal: FC<categoryEdit> = ({
    editData,
    elementLoading,
    closeDriver,
}) => {
    const [fileList, setFileList] = useState<UploadFile<errorI>[]>([]);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState("");
    const addCategoryRequest = usePostRequest<finishI>({
        url: addCategoryUrl,
    });
    const putCategoryRequest = usePutRequest<finishI>({
        url: editCategoryUrl(editData?.id as number),
    });

    const [form] = Form.useForm();

    const translate = useLanguage();

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

    const closeDrawerForm = () => {
        closeDriver()
        form.resetFields();
     }
    
    const handlyPreview = async (file: any) => {
        setPreviewImage(file.url);
        setPreviewOpen(true);
        setPreviewTitle(file.url.substring(file.url.lastIndexOf("/") + 1));
    };
    // image delete
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
    //  add image
    const handlyChange = async ({ file }: any) => {
        setLoading(true);
        if (
            file.type == "image/jpeg" ||
            file.type == "image/png" ||
            file.type == "image/gif" ||
            file.type == "image/webp"
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

                form.setFieldValue("catImage", data.url);
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

    // post and put category
    const onFinish = async (e: finishI) => {
        const { name_uz, name_ru, slug, parent_id, catImage } = e;
        if (editData) {
            const { success, error } =
                await putCategoryRequest.request<finishI>({
                    data: { name_uz, name_ru, slug, parent_id, catImage },
                });
            if (success) {
                closeDriver();
                message.success("Category update");
            }
            if (error) {
                closeDriver();
                message.error("error");
            }
        } else {
            const { success, error } =
                await addCategoryRequest.request<finishI>({
                    data: { name_uz, name_ru, slug, parent_id, catImage },
                });
            if (success) {
                closeDriver();
                message.success("Category crate");
            }
            if (error) {
                closeDriver();
                message.error("error");
            }
        }
    };

    useEffect(() => {
        if (editData != null) {
            form.setFieldsValue(editData);
            setFileList([
                {
                    uid: editData.slug,
                    name: editData.name_uz,
                    status: "done",
                    url: editData.image,
                },
            ]);
        }
    }, [editData]);

    return (
        <>
            <Form onFinish={onFinish} form={form}>
                <Form.Item name='name_uz' rules={[{ required: true }]}>
                    <Input placeholder={`${translate("name")} uz`} />
                </Form.Item>
                <Form.Item name='name_ru' rules={[{ required: true }]}>
                    <Input placeholder={`${translate("name")} ru`} />
                </Form.Item>
                <Form.Item name='slug' rules={[{ required: true }]}>
                    <Input placeholder={translate("slug")} />
                </Form.Item>
                <Form.Item name='parent_id' rules={[{ required: true }]}>
                    <InputNumber
                        placeholder={translate("parent_id")}
                        style={{ width: "220px" }}
                    />
                </Form.Item>
                <Form.Item name='catImage'>
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
        </>
    );
};
