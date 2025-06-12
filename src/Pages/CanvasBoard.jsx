import { SidebarProvider } from "@/components/ui/sidebar";
import Joyride from "react-joyride";
import AppSidebar from "../Canvas/AppSidebar";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Canvas from "@/Canvas/Canvas";
import { motion } from "motion/react";
import LogoFull from "@/components/custom/LogoFull";

const steps = [
    {
        target: ".reference-height-step",
        content: "To start, set the reference height of your image.",
    },
    {
        target: ".upload-image-step",
        content: "This another awesome feature!",
    },
];

const CanvasBoard = () => {
    const { tutorial } = useSelector(state => state.lines);
    return (
        <SidebarProvider>
            <div className={`w-96 p-2`}>
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
    );
};

export default CanvasBoard;
