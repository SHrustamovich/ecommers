import { FC, useContext } from "react";
import { Select } from "antd";
import { LanguageContext } from "../context/languageContext";
import { LangEnums } from "../utils/helpers";
const { Option } = Select;
export const SelectLang: FC = () => {
    const { language, setLanguage } = useContext(LanguageContext);
    const handlyChange = (target: LangEnums) => {
        localStorage.setItem("language", target);
        setLanguage?.(target);
    };
    return (
        <>
            <Select
                defaultValue={language as LangEnums}
                style={{ width: 120, marginRight: 43 }}
                onChange={handlyChange}
            >
                <Option value='uz'>Uz</Option>
                <Option value='ru'>Ru</Option>
            </Select>
        </>
    );
};
