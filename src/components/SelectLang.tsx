import { FC } from "react";
import { Select } from 'antd';
export const SelectLang: FC = () => {
    return (
        <>
            <Select
                defaultValue="uz"
                style={{ width: 120,marginRight:43 }}
                options ={[
                    {
                        value: 'uz',
                        label: 'Uzb',
                      },
                      {
                        value: 'ru',
                        label: 'Rus',
                      }
                ]}
            />
        </>
    )
}