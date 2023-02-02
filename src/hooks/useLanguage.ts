import { useContext } from "react";
import { LanguageContext } from "../context/languageContext";
import { languages } from "../utils/translate";
function useLanguage() {
    const { language } = useContext(LanguageContext);
    return (text: string) => {
        let lang = languages[language];
        return lang[text as keyof typeof lang] || text;
    };
}
export default useLanguage;
