import { FC, ReactElement, createContext, useState } from "react";
import { LangEnums } from "../utils/helpers";

interface LanguageProProps {
    children: ReactElement;
}

interface LanguageContext {
    language: LangEnums | string;
    setLanguage?: (a: LangEnums) => void;
}
const LanguageContextInitials = {
    language: LangEnums.UZ,
};
export const LanguageContext = createContext<LanguageContext>(
    LanguageContextInitials
);
const LanguageProvider: FC<LanguageProProps> = ({ children }) => {
    const initialLanguage = localStorage.getItem("language") || "uz";
    const [language, setLanguage] = useState(initialLanguage);
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
export default LanguageProvider;
