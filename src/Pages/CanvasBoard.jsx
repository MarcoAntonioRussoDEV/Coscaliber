import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../Canvas/AppSidebar";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Canvas from "@/Canvas/Canvas";
import { motion } from "motion/react";

const CanvasBoard = () => {
    return (
        <SidebarProvider>
            <Canvas />
            <AppSidebar />
        </SidebarProvider>
    );
};

export default CanvasBoard;
