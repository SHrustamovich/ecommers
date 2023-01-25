import { Table } from "antd";
import { FC } from "react";
import { useLoad } from "../hooks/requies";
import useLanguage from "../hooks/useLanguage";
import { orderList } from "../utils/urls";
import { orderI } from "./types";

export const Orders:FC = () => {
const translate = useLanguage()
const localOrders = localStorage.getItem('language')
const orderRequest = useLoad<orderI>({ url:orderList })
const {loading,response} = orderRequest
    const columns = [
        { title: `id`, dataIndex: 'id' },
        { title: `${translate('delivery_address')}`, dataIndex: 'delivery_address' },
        { title: `${translate('delivery_phone')}`, dataIndex: 'delivery_phone' },
        { title: `${translate('name')}`, dataIndex: 'name' },
        { title: `${translate('product')}`, dataIndex: 'product' },
        { title:``, dataIndex:''}
    ];
    return(
        <div className="orders">
            <Table
            columns={columns}
            loading={loading}
            dataSource = {response?.orders.map(item => ({
                key:item.id,
                id:item.id,
                delivery_address:item.delivery_address,
                delivery_phone:item.delivery_phone,
                name:item.full_name,
                product:item.order_it
            }))}
            />
        </div>
    )
}