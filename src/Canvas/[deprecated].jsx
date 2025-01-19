import React, { useRef, useEffect } from "react";
import Line from "./Line";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
    addElement,
    setIsDrawing,
    setMousePosition,
    setDots,
    addPointsPair,
    addLastPointToLastPair,
    addNewLine,
    setCanvas,
} from "@redux/lineSlice.js";
import useCanvasElement from "@hooks/use-canvas-element";

const DrawingCanvas = () => {
    const canvasRef = useRef(null);
    const {
        lines,
        elements,
        bools: { isDrawing, dots },
        mouse: { x: mouseX, y: mouseY },
        pointPairs,
    } = useSelector(state => state.lines);
    const dispatch = useDispatch();
    const { createElement } = useCanvasElement();

    useEffect(() => {
        const handleMouseMove = e => {
            dispatch(setMousePosition({ x: e.clientX, y: e.clientY }));
        };
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            dispatch(setCanvas(canvasRef));
        }
    }, [canvasRef]);

    const startDrawing = () => {
        if (isDrawing) {
            const newElement = {
                x: mouseX,
                y: mouseY,
                id: elements.length,
            };
            dispatch(addElement(newElement));
            createElement();

            if (dots === 0) {
                dispatch(setDots(1));
                dispatch(addPointsPair([{ x: mouseX, y: mouseY }]));
            } else {
                dispatch(setDots(0));
                dispatch(addLastPointToLastPair({ x: mouseX, y: mouseY }));
            }
        }
    };

    useEffect(() => {
        if (pointPairs.length > 0) {
            const lastPair = pointPairs[pointPairs.length - 1];
            if (lastPair.length === 2) {
                dispatch(addNewLine());
            }
        }
    }, [pointPairs]);

    return (
        <div
            ref={canvasRef}
            className={`relative w-full  ${
                isDrawing ? "cursor-crosshair" : "cursor-auto"
            }`}
            onClick={startDrawing}
        >
            <SidebarTrigger className="end-0 top-1 absolute z-10 " />
            {lines.map((line, idx) => {
                return (
                    <Line
                        key={idx}
                        {...line}
                        borderColor="white"
                        borderWidth={2}
                        id={`line-${idx}`}
                    />
                );
            })}
        </div>
    );
};

export default DrawingCanvas;
