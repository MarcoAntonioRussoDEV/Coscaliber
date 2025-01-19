import {
    addNewLine,
    setDots,
    setIsDrawing,
    setLastLineFrom,
    setLastLineTo,
    setMousePosition,
    setReferenceLineFrom,
    setReferenceLineTo,
} from "@/Redux/Redux-Slices/lineSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Line from "./Line";
import LineModel from "@/Models/LineModel";
import { SidebarTrigger } from "@/components/ui/sidebar";
const Canvas = () => {
    const {
        bools: { isDrawing, dots, isEdit },
        mouse: { x: mouseX, y: mouseY },
        lines,
        referenceLine,
        image,
    } = useSelector(state => state.lines);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleMouseMove = e => {
            dispatch(setMousePosition({ x: e.clientX, y: e.clientY }));
        };
        window.addEventListener("mousemove", handleMouseMove);
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
        if (isDrawing) {
            if (!referenceLine || !referenceLine.to) {
                initializeReferenceLine();
            } else {
                handleDoubleDotsLogic(setLastLineFrom, setLastLineTo);
            }
        }
    };

    useEffect(() => {
        console.log("lines: ", lines);
        console.log("referenceLine: ", referenceLine);
    }, [lines, referenceLine]);

    return (
        <div
            className={`relative w-full h-screen  ${
                isDrawing ? "cursor-crosshair" : "cursor-auto"
            }`}
            onClick={handleDrawing}
        >
            <SidebarTrigger className="end-0 top-1 absolute z-10 " />

            {image && (
                <div className="absolute inset-0 items-center justify-center flex p-10 w-fit m-auto">
                    <img
                        src={image}
                        className="opacity-30 w-full h-full object-contain rounded-xl"
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
