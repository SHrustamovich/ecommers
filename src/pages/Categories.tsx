import { Button, message, Modal, Space, Table } from "antd";
import { FC, useState } from "react";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDeleteRequest, useLoad } from "../hooks/requies";
import { categoryList, deleteCategoryUrl } from "../utils/urls";
import { categoryI, categoryArrayI } from "../components/Drawers/types";
import { CategoryMadal } from "../components/Drawers/CategoryMadal";
import { DeleteModal } from "../components/DeleteModal";
import useLanguage from "../hooks/useLanguage";
import { LangEnums } from "../utils/helpers";

const categoryInitials = {
    id:null,
    name_uz:'',
    name_ru:'',
    image:'',
    slug:'',
    parent_id:null,
    position:null,
    views:null,
    is_featured:null,
    status:null,
    priority:null,
    children:[]
}
export const Categories: FC = () => {
    const [categoryItem,setCategoryItem] = useState<categoryArrayI>(categoryInitials)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idCategory, setIdCategory] = useState<number | null>(null)
    const [deleteC, setDeleteC] = useState(false)
    const [elementLoading, setElementLoading] = useState(false)

    const translate = useLanguage()
    const localCategory = localStorage.getItem('language')

    const handleOk = () => {
        setDeleteC(true)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const categoryRequest = useLoad<categoryI>({ url: categoryList })
    const { loading, response } = categoryRequest
    // const categoryAll = response && response
    // delete
    // async function refreshHandler() {
	// 	await categoryRequest.request()
	// }
    const categoryDelete = useDeleteRequest()
    const deleteHandly = async () => {
        setElementLoading(true)
            const { success, error } = await categoryDelete.request({
                url: deleteCategoryUrl(categoryItem.id as number)
            })
            if(success){
                setElementLoading(false)
                setIsModalOpen(false)
                await categoryRequest.request()
                message.success('catedory Deleted')
            }
            if(!success){
                setElementLoading(false)
                setIsModalOpen(false)
                message.warning(error)
            }
    }
    const deleteCategoryhandly = (e: any) => {
        setIsModalOpen(true);
        setIdCategory(e)
    }
    const columns = [
        { title: `${translate('name')}`, dataIndex: 'name' },
        {
            title: `${translate('action')}`,
            dataIndex: '',
            render: ({ id }: any) => {
                return <Space size={10}>
                    <Button>
                        <EditOutlined />
                    </Button>
                    <Button danger onClick={() => deleteCategoryhandly(id)}>
                        <DeleteOutlined />
                    </Button>
                </Space>
            },
        }
    ]
    return (
        <div className="orders">
            <div className="category-add"><CategoryMadal /></div>
            <DeleteModal
                title='Do you want to delete the category?'
                visible={isModalOpen}
                loading={elementLoading}
                onCancelHandler={() => setIsModalOpen(false)}
                onOkHandler={deleteHandly}
            />
            <Table
                columns={columns}
                loading={loading}
                dataSource={response?.categories.map((item) => ({
                    key: item.id,
                    id: item.id,
                    name: localCategory == 'uz' ? item.name_uz : item.name_ru
                }))}
                pagination={false}
            />
        </div>
    )
}