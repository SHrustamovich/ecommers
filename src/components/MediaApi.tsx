import Upload from "antd/es/upload/Upload";
import { FC, useState } from "react";
import { AES } from "crypto-ts";
import { message, Modal } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { $mediaApi } from "../utils/https";
import { mediaAdd } from "../utils/urls";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
interface errorI {
    uid: string;
    name: string;
    status: string;
    url: string;
}

export const MediaApi: FC = () => {
    const [fileList, setFileList] = useState<UploadFile<errorI>[]>([]);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState("");
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
    const onPreview = async ({ file }: any) => {
        setPreviewImage(file.url);
        setPreviewOpen(true);
        setPreviewTitle(file.url);
    };
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
                // setJsonData([...jsonData,name = data.url])
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
            <div>Upload</div>
        </div>
    );
    return (
        <>
            <Upload
                fileList={fileList as UploadFile[]}
                customRequest={handlyChange}
                onPreview={onPreview}
            >
                {fileList.length === 1 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle}>
                <img src={previewImage} alt='' />
            </Modal>
        </>
    );
};
