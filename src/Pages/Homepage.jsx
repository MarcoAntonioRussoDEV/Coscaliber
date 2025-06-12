// @ts-nocheck
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewProject from "./NewProject";
import UploadProject from "./UploadProject";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useTranslateCapitalize from "@/Hooks/use-translate-capitalize";
import React from "react";
import Logo from "@/components/custom/Logo";

const Homepage = () => {
    const tc = useTranslateCapitalize("homepage");

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="w-28">
                <Logo />
            </div>
            <h1 className="text-center text-4xl text-primary italic font-bold">
                {import.meta.env.VITE_APP_NAME}
            </h1>
            <Tabs
                defaultValue="new-project"
                className="w-[400px]  flex flex-col justify-center items-center"
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
