import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../Canvas/AppSidebar";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Canvas from "@/Canvas/Canvas";

const Homepage = () => {
    const ref = useRef(null);
    const [isDragged, setIsDragged] = useState(false);

    const {
        mouse: { x: mouseX, y: mouseY },
    } = useSelector(state => state.lines);

    const handleClick = () => {
        if (isDragged) {
            setIsDragged(false);
        } else {
            setIsDragged(true);
        }
    };

    const handleMove = e => {
        if (isDragged) {
            ref.current.style.left = `${e.clientX}px`;
            ref.current.style.top = `${e.clientY}px`;
        }
    };

    return (
        <SidebarProvider onMouseMove={handleMove}>
            {/* <h1
                ref={ref}
                className={`text-4xl absolute z-20 ${
                    isDragged ? "cursor-grabbing" : "cursor-grab"
                }`}
                onMouseDown={handleClick}
                onMouseUp={handleClick}
            >
                Homepage
            </h1> */}
            <Canvas />
            {/* <DrawingCanvas /> */}
            <AppSidebar />
        </SidebarProvider>
    );
};

export default Homepage;
