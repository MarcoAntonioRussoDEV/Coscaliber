// @ts-nimport LogoFull from "../components/custom/LogoFull";check
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewProject from "./NewProject";
import UploadProject from "./UploadProject";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useTranslateCapitalize from "@/Hooks/use-translate-capitalize";
import React from "react";
import Logo from "@/components/custom/Logo";
import LogoFull from "@/components/custom/LogoFull";

const Homepage = () => {
    const tc = useTranslateCapitalize("homepage");
    const [animationIsEnded, setAnimationIsEnded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationIsEnded(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div
                className={`w-full px-20 duration-1000 ease-in-out transition-all ${
                    animationIsEnded && "scale-50"
                }`}
            >
                <LogoFull />
            </div>

            <Tabs
                defaultValue="new-project"
                className={`w-[400px]  flex flex-col justify-center items-center opacity-0 transition-opacity duration-1000 ease-in-out ${
                    animationIsEnded && "opacity-100"
                }`}
            >
                <TabsList>
                    <TabsTrigger value="new-project">
                        {tc("homepage:newProject")}
                    </TabsTrigger>
                    <TabsTrigger value="upload-project">
                        {tc("homepage:uploadProject")}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="new-project">
                    <NewProject />
                </TabsContent>
                <TabsContent value="upload-project">
                    <UploadProject />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Homepage;
