import { SidebarProvider } from "@/components/ui/sidebar";
import Joyride from "react-joyride";
import AppSidebar from "../Canvas/AppSidebar";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Canvas from "@/Canvas/Canvas";
import { motion } from "motion/react";

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
            {tutorial && <Joyride steps={steps} />}
            <Canvas />
            <AppSidebar />
        </SidebarProvider>
    );
};

export default CanvasBoard;
