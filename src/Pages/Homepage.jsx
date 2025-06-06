// @ts-nocheck
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewProject from "./NewProject";
import UploadProject from "./UploadProject";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useTranslateCapitalize from "@/Hooks/use-translate-capitalize";
import React from "react";

const Homepage = () => {
    const tc = useTranslateCapitalize("homepage");

    return (
        <>
            <Tabs
                defaultValue="new-project"
                className="w-[400px] mx-auto mt-auto h-screen flex flex-col justify-center items-center"
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
        </>
    );
};

export default Homepage;
