import { Button, Drawer, Form, Input, InputNumber, message } from "antd";
import { FC, useEffect } from "react";
import { usePostRequest, usePutRequest } from "../../hooks/requies";
import useLanguage from "../../hooks/useLanguage";
import { attributePost, attributes, mainAttribute } from "../../pages/types";
import { attributeAdd, attributeUpdate } from "../../utils/urls";
export const AttributeModal: FC<mainAttribute> = ({
    open,
    onClose,
    editAttribute,
}) => {
    const attributePost = usePostRequest<attributePost>({ url: attributeAdd });

    const attributePut = usePutRequest<attributes>({
        url: attributeUpdate(editAttribute?.id as number),
    });

    const translate = useLanguage();
    const clearInpurBrand = () => {
        form.resetFields();
        onClose();
    };

    const [form] = Form.useForm();

    const onFinish = async (item: any) => {
        const { name_uz, name_ru, is_filterable } = item;
        if (editAttribute) {
            const { success, error } = await attributePut.request<attributes>({
                data: { name_uz, name_ru, is_filterable },
            });
            if (success) {
                onClose();
                message.success("Attribute update");
            }
            if (error) {
                onClose();
                message.error("error");
            }
        } else {
            const { success, error } = await attributePost.request({
                data: { name_uz, name_ru, is_filterable },
            });
            if (success) {
                onClose();
                message.success("Attribute create");
            }
            if (error) {
                onClose();
                message.error("error");
            }
        }
    };

    useEffect(() => {
        if (editAttribute != null) {
            form.setFieldsValue(editAttribute);
        }
    }, [editAttribute]);
    return (
        <>
            <Drawer
                title={translate("create_a_new_attribute")}
                width={620}
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
                    <Form.Item
                        name='is_filterable'
                        rules={[{ required: true }]}
                    >
                        <InputNumber
                            placeholder={`${translate("is_filterable")}`}
                            style={{ width: 100 }}
                        />
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
