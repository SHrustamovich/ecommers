import { Card } from "antd";
import { FC } from "react";
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import Meta from "antd/es/card/Meta";
import { useLoad } from "../hooks/requies";
import { brandsI } from "./types";
import { barndsList } from "../utils/urls";
import { BrandsModal } from "../components/Drawers/BrandsModal";
export const Brands:FC = () => {
    const brandsList = useLoad<brandsI>({url:barndsList})
    const {loading,response} = brandsList
    const localBrands = localStorage.getItem('language')
    return(
        <div className="orders">
            <div className="open-madal">
                <BrandsModal/>
            </div>
           {
            response?.brands.map(item => (
                <Card
                style={{width:200}}
                cover = {
                <img src={item.image} alt="" />
                }
                actions = {[
                    <EditOutlined key='edit'/>,
                    <DeleteOutlined key='delete'/>
                ]}
                >
               <Meta
               title ={localBrands == 'uz' ? item.name_uz : item.name_ru}
               description ={item.updated_at}
               />
                </Card>
            ))
           }
        </div>
    )
}