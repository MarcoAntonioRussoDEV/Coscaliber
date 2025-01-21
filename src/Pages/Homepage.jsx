import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewProject from "./NewProject";
import UploadProject from "./UploadProject";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectValue } from "@radix-ui/react-select";
import useTranslateCapitalize from "@/Hooks/use-translate-capitalize";
const Homepage = () => {
    const [locale, setLocale] = useState();
    const { i18n } = useTranslation();
    const tc = useTranslateCapitalize("homepage");

    const handleLocaleChange = value => {
        setLocale(value);
        i18n.changeLanguage(value);
    };
    return (
        <>
            <Select
                onValueChange={handleLocaleChange}
                value={locale}
            >
                <SelectTrigger>
                    <SelectValue placeholder="select locale" />
                </SelectTrigger>
                <SelectContent
                    selec
                    defaultValue={locale}
                >
                    <SelectItem value="en">EN</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                </SelectContent>
            </Select>
            <Tabs
                defaultValue="new-project"
                className="w-[400px] mx-auto mt-auto h-screen flex flex-col justify-center items-center"
            >
                <TabsList>
                    <TabsTrigger value="new-project">New Project</TabsTrigger>
                    <TabsTrigger value="upload-project">
                        Upload Project
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="new-project">
                    <NewProject />
                </TabsContent>
                <TabsContent value="upload-project">
                    <UploadProject />
                </TabsContent>
            </Tabs>
        </>
    );
};

export default Homepage;
