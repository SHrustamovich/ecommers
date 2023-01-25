import { FC, useState } from "react";
import { Button, message, Space, Table } from 'antd';
import { useDeleteRequest, useLoad } from "../hooks/requies";
import { allproduct, deleteproductUrl } from "../utils/urls";
import OpenMadal from "../components/Drawers/ProductsMadal";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import useLanguage from "../hooks/useLanguage";
import { DeleteModal } from "../components/DeleteModal";

interface DataType {
    id: null | number;
    name_uz: string;
    name_ru:string
    image: string;
    price: string;
    description: string;
}

export interface PaginationI {
    current: number
    next: number
    per_page: number
    previous: null
    total: number
    total_pages: number

}

interface ProductListRequestI {
    products: DataType[],
    pagination: PaginationI
}

const productItitials = {
    id: null,
    name_uz: '',
    name_ru:'',
    image: '',
    price: '',
    description: '',
}

export const AllProducts: FC = () => {
    const [productItem,setProductItem] = useState<DataType>(productItitials)
    const [elementLoading,setElementLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    // translate
    const translate = useLanguage()
    const lacalLanguage = localStorage.getItem("language")
    const productRequest = useLoad<ProductListRequestI>({ url: allproduct })
    const { loading, response } = productRequest
    // delete
    const deleteProdct = useDeleteRequest()
    const deletehandly = async () => {
     setElementLoading(true)
     const { success, error } =await deleteProdct.request({
        url:deleteproductUrl(productItem.id as number)
     })
     if(success){
        setElementLoading(false)
        setIsModalOpen(false)
        await productRequest.request()
        message.success(`${translate('catedory_deleted')}`)
     }
     if(!success){
        setElementLoading(false)
        setIsModalOpen(false)
        message.warning(error)
     }
    }
    const handlyDelete = (id:number) => {
        setProductItem({...productItem, id})
       setIsModalOpen(true)
       
    }
    const columns = [
        { title: `${translate('name')}`, dataIndex: 'name' },
        { title: `${translate('image')}`, dataIndex: 'image', render: (image: string) => <img width={70} src={image} /> },
        { title: `${translate('price')}`, dataIndex: 'price' },
        {
            title: `${translate('action')}`,
            dataIndex: '',
            render: ({id}:any) => (
                <Space size={10}>
                    <Button>
                        <EditOutlined />
                    </Button>
                    <Button danger onClick={() => handlyDelete(id)}>
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="all-products">
            <div className="open-madal"> <OpenMadal /></div>
            <DeleteModal
            title={translate("d_product")}
            visible={isModalOpen}
            loading={elementLoading}
            onCancelHandler={() => setIsModalOpen(false)}
            onOkHandler={deletehandly}
            />
            <Table
                columns={columns}
                loading={loading}
                dataSource={response?.products?.map((item) => ({
                    key: item.id,
                    id: item.id,
                    name: lacalLanguage == 'uz' ? item.name_uz : item.name_ru,
                    image: item.image,
                    price: item.price
                }))}
                pagination={response?.pagination}
            />
        </div>
    )
}