import { Modal } from "antd";
import { FC } from "react";
import { DeleteI } from "./Drawers/types";

export const DeleteModal:FC<DeleteI> =({
    visible,
    title,
    loading,
    onOkHandler,
    onCancelHandler
}) => {
    return (
        <>
        <Modal
        title={title}
        centered
        visible={visible}
        onOk={onOkHandler}
        confirmLoading={loading}
        okText='Yes'
        cancelText='No'
        okType='danger'
        onCancel={onCancelHandler}
        />
        </>
    )
}