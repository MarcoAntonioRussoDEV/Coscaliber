import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Line = ({ line }) => {
    const { from, to, color, borderWidth, id } = line;

    const { selectedLineId, pixelToCmRatio, referenceHeight } = useSelector(
        state => state.lines
    );
    const { x: x1, y: y1 } = from;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = event => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    let x2, y2;

    if (to) {
        x2 = to.x;
        y2 = to.y;
    } else {
        x2 = mousePosition.x;
        y2 = mousePosition.y;
    }

    return (
        <svg className="absolute w-full h-full top-0 left-0">
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={selectedLineId === id ? "red" : color}
                className={selectedLineId === id ? "pulse" : ""}
                strokeWidth={borderWidth}
                id={id}
            />
            <text
                x={(x1 + x2 + 10) / 2}
                y={(y1 + y2) / 2}
                fill={color}
            >
                {line.id === 1
                    ? referenceHeight
                    : line.to
                    ? line.size
                    : line.getDistanceInCm(pixelToCmRatio, {
                          x: mousePosition.x,
                          y: mousePosition.y,
                      })}{" "}
                cm
            </text>
        </svg>
    );
};

export default Line;
