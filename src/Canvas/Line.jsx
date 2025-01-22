import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import LineModel from "@/models/LineModel";

const Line = ({ line }) => {
    const { from, to, color, borderWidth, id } = line;
    const imageRef = useRef(null);
    const {
        calculated: { pixelToCmRatio, referenceHeight },
        utils: { selectedLineId },
        image,
    } = useSelector(state => state.lines);

    // Converti le coordinate assolute in coordinate relative all'immagine
    const getRelativeCoordinates = (absoluteX, absoluteY) => {
        const imageElement = document.querySelector("img");
        if (!imageElement) return { x: absoluteX, y: absoluteY };

        const imageRect = imageElement.getBoundingClientRect();
        const relativeX =
            ((absoluteX - imageRect.left) / imageRect.width) * 100;
        const relativeY =
            ((absoluteY - imageRect.top) / imageRect.height) * 100;

        return { x: relativeX, y: relativeY };
    };

    // Converti le coordinate relative in coordinate assolute
    const getAbsoluteCoordinates = (relativeX, relativeY) => {
        const imageElement = document.querySelector("img");
        if (!imageElement) return { x: relativeX, y: relativeY };

        const imageRect = imageElement.getBoundingClientRect();
        const absoluteX = (relativeX * imageRect.width) / 100 + imageRect.left;
        const absoluteY = (relativeY * imageRect.height) / 100 + imageRect.top;

        return { x: absoluteX, y: absoluteY };
    };

    const [mousePosition, setMousePosition] = useState(
        getRelativeCoordinates(0, 0)
    );

    useEffect(() => {
        const handleMouseMove = event => {
            setMousePosition(
                getRelativeCoordinates(event.clientX, event.clientY)
            );
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Converti le coordinate dei punti
    const fromCoords = getAbsoluteCoordinates(from.x, from.y);
    const toCoords = to
        ? getAbsoluteCoordinates(to.x, to.y)
        : getAbsoluteCoordinates(mousePosition.x, mousePosition.y);

    return (
        <svg
            className="absolute w-full h-full top-0 left-0"
            preserveAspectRatio="none"
        >
            <line
                x1={fromCoords.x}
                y1={fromCoords.y}
                x2={toCoords.x}
                y2={toCoords.y}
                stroke={selectedLineId === id ? "red" : color}
                className={selectedLineId === id ? "pulse" : ""}
                strokeWidth={borderWidth}
                id={id}
            />
            <text
                x={(fromCoords.x + toCoords.x) / 2 + 10}
                y={(fromCoords.y + toCoords.y) / 2}
                fill={color}
            >
                {line.id === 1
                    ? referenceHeight
                    : line.to
                    ? line.size
                    : LineModel.fromSerializable(line).getDistanceInCm(
                          pixelToCmRatio,
                          toCoords
                      )}{" "}
                cm
            </text>
        </svg>
    );
};

export default Line;
