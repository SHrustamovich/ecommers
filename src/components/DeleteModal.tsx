import { Modal } from "antd";
import { FC } from "react";
import useLanguage from "../hooks/useLanguage";
import { DeleteI } from "./Drawers/types";

export const DeleteModal:FC<DeleteI> =({
    visible,
    title,
    loading,
    onOkHandler,
    onCancelHandler
}) => {
    
    const translate = useLanguage()

    return (
        <>
        <Modal
        title={title}
        centered
        visible={visible}
        onOk={onOkHandler}
        confirmLoading={loading}
        okText={translate('yes')}
        cancelText={translate('no')}
        okType='danger'
        onCancel={onCancelHandler}
        />
        </>
    )
}