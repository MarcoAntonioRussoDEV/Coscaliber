import { SidebarProvider } from "@/components/ui/sidebar";
import Joyride from "react-joyride";
import AppSidebar from "../Canvas/AppSidebar";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Canvas from "@/Canvas/Canvas";
import { motion } from "motion/react";
import LogoFull from "@/components/custom/LogoFull";
import { useTranslation } from "react-i18next";

const CanvasBoard = () => {
    const { tutorial } = useSelector(state => state.lines);
    const { t } = useTranslation();

    const steps = [
        {
            target: ".reference-height-step",
            content: t("canvas:tutorial_step_reference_height"),
        },
        {
            target: ".upload-image-step",
            content: t("canvas:tutorial_step_upload_image"),
        },
        {
            target: "#canvas-step",
            content: (
                <iframe
                    width="100%"
                    height="200"
                    src="https://www.youtube.com/embed/VIDEO_ID"
                    title="Tutorial Step"
                    allowFullScreen
                />
            ),
        },
    ];
    return (
        <div className="bg-gray-100">
            <SidebarProvider>
                <div className={`w-80 p-2 absolute top-0 left-0`}>
                    <LogoFull />
                </div>
                {tutorial && (
                    <Joyride
                        steps={steps}
                        continuous={true}
                    />
                )}
                <Canvas />
                <AppSidebar />
            </SidebarProvider>
        </div>
    );
};

export default CanvasBoard;
