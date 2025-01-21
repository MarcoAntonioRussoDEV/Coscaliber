import { useTranslation } from "react-i18next";

export const useTranslateCapitalize = namespace => {
    const { t } = useTranslation(namespace);
    const tc = key => capitalize(t(key));
    return tc;
};

export default useTranslateCapitalize;

export const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
