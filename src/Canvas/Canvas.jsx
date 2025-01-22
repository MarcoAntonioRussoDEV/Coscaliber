import {
    setLastLineFrom,
    setLastLineTo,
    setMousePosition,
    setReferenceLineFrom,
    setReferenceLineTo,
} from "@/Redux/Redux-Slices/lineSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Line from "./Line";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const Canvas = () => {
    const isDebug = JSON.parse(
        import.meta.env.VITE_BORDER_DEBUG?.toLowerCase() || "false"
    );
    const {
        bools: { isDrawing, dots, isEdit },
        mouse: { x: mouseX, y: mouseY },
        lines,
        referenceLine,
        image,
        projectName,
    } = useSelector(state => state.lines);
    const dispatch = useDispatch();
    const { isMobile, openMobile, setOpenMobile } = useSidebar();

    useEffect(() => {
        const handleMouseMove = e => {
            dispatch(setMousePosition({ x: e.clientX, y: e.clientY }));
        };
        window.addEventListener("mousemove", handleMouseMove);

        setOpenMobile(true);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const initializeReferenceLine = () => {
        handleDoubleDotsLogic(setReferenceLineFrom, setReferenceLineTo);
    };

    const handleDoubleDotsLogic = (firstPointAction, secondPointAction) => {
        if (dots === 0) {
            dispatch(firstPointAction());
        } else {
            dispatch(secondPointAction());
        }
    };

    const handleDrawing = () => {
        if (isDrawing && image) {
            if (!referenceLine || !referenceLine.to) {
                initializeReferenceLine();
            } else {
                handleDoubleDotsLogic(setLastLineFrom, setLastLineTo);
            }
        }
    };

    // useEffect(() => {
    //     console.log("lines: ", lines);
    //     console.log("referenceLine: ", referenceLine);
    // }, [lines, referenceLine]);

    return (
        <div
            className={`relative w-full h-screen   ${
                isDrawing ? "cursor-crosshair" : "cursor-auto"
            }`}
            onClick={handleDrawing}
        >
            <p className="absolute top-1 w-full text-center font-bold text-xl uppercase">
                {projectName}
            </p>
            <SidebarTrigger
                className="end-0 top-1 absolute z-10 "
                isOpen={openMobile}
            />
            {image && (
                <div className="absolute inset-0 items-center justify-center flex p-20 w-fit m-auto pointer-events-none">
                    <img
                        src={image}
                        className={`reference-image opacity-30 w-full h-full object-contain rounded-xl pointer-events-none ${
                            isDebug ? "border border-debug" : ""
                        }`}
                    />
                </div>
            )}
            {lines
                .filter(line => !line.isHidden)
                .map(line => (
                    <Line
                        key={line.id}
                        line={line}
                    />
                ))}
        </div>
    );
};

export default Canvas;
