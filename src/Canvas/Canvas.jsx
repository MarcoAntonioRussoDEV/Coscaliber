import {
    addNewLine,
    setDots,
    setIsDrawing,
    setLastLineFrom,
    setLastLineTo,
    setMousePosition,
    setReferenceLineFrom,
    setReferenceLineTo,
} from "@/Redux/Redux-Slices/lineSlicePREV";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Line from "./Line";
import LineModel from "@/Models/LineModel";

const Canvas = () => {
    const {
        isDrawing,
        isEdit,
        mouse: { x: mouseX, y: mouseY },
        lines,
        referenceLine,
        dots,
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
            // const line = new LineModel();
            // line.from = { x: mouseX, y: mouseY };
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

            // if (dots === 0) {
            //     dispatch(setDots(1));
            //     const line = new LineModel();
            //     line.from = { x: mouseX, y: mouseY };
            //     dispatch(addNewLine(line));
            // } else {
            //     dispatch(setDots(0));
            //     dispatch(setLastLineTo({ x: mouseX, y: mouseY }));
            // }
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
            {referenceLine && <Line line={referenceLine} />}
            {lines.map(line => (
                <Line
                    key={line.id}
                    line={line}
                />
            ))}
        </div>
    );
};

export default Canvas;
