import { FC } from "react";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Paginations from "../components/Paginations";
import { useGetRequest } from "../hooks/requies";
import { allproduct } from "../utils/urls";
import OpenMadal from "../components/OpenMadal";

const { Meta } = Card;
export const AllProducts: FC = () => {
    const getRequest = useGetRequest({url:allproduct})
    
    return (
        <div className="all-products">
            <OpenMadal/>
            <Card
                style={{ width: 250,height:304}}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={[
                    <EditOutlined key="edit" />,
                    <DeleteOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
            <Paginations/>
        </div>
    )
}