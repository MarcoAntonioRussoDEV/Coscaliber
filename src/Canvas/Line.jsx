import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import LineModel from "@/models/LineModel";
import { updateLineVertices } from "@/Redux/Redux-Slices/lineSlice";
import { Spinner } from "@/components/ui/spinner";

const Line = ({ line }) => {
    const dispatch = useDispatch();
    const { from, to, color, borderWidth, id } = line;
    const imageRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedVertex, setDraggedVertex] = useState(null);
    const [dragPosition, setDragPosition] = useState(null);
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

    const {
        calculated: { pixelToCmRatio, referenceHeight },
        utils: { selectedLineId },
        image,
    } = useSelector(state => state.lines);

    // Ottieni il riferimento all'immagine dal DOM
    const getImageElement = () => document.querySelector(".reference-image");

    // Converti le coordinate assolute in coordinate relative all'immagine
    const getRelativeCoordinates = (absoluteX, absoluteY) => {
        const imageElement = getImageElement();
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

    const handleVertexMouseDown = (e, vertex) => {
        e.stopPropagation();
        setIsDragging(true);
        setDraggedVertex(vertex);
        // Salva la posizione iniziale del drag
        setDragPosition(getRelativeCoordinates(e.clientX, e.clientY));
    };

    const handleMouseMove = e => {
        if (!isDragging || !draggedVertex) return;

        const newCoords = getRelativeCoordinates(e.clientX, e.clientY);
        setDragPosition(newCoords);
        setMagnifierPosition({ x: e.clientX, y: e.clientY });

        requestAnimationFrame(() => {
            const updatedLine = { ...line };
            if (draggedVertex === "from") {
                updatedLine.from = newCoords;
            } else {
                updatedLine.to = newCoords;
            }
            dispatch(updateLineVertices(updatedLine));
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDraggedVertex(null);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };
        }
    }, [isDragging, draggedVertex]);

    // Usa dragPosition per il rendering se disponibile
    const fromCoords =
        isDragging && draggedVertex === "from" && dragPosition
            ? getAbsoluteCoordinates(dragPosition.x, dragPosition.y)
            : getAbsoluteCoordinates(from.x, from.y);

    const toCoords =
        isDragging && draggedVertex === "to" && dragPosition
            ? getAbsoluteCoordinates(dragPosition.x, dragPosition.y)
            : to
            ? getAbsoluteCoordinates(to.x, to.y)
            : getAbsoluteCoordinates(mousePosition.x, mousePosition.y);

    const isSelected = selectedLineId === id;
    const isSelectionActive = selectedLineId !== null;

    return (
        <>
            <svg
                className={`absolute w-full h-full top-0 left-0 ${
                    isSelected ? "z-10" : "pointer-events-none"
                }`}
                preserveAspectRatio="none"
            >
                <line
                    x1={fromCoords.x}
                    y1={fromCoords.y}
                    x2={toCoords.x}
                    y2={toCoords.y}
                    stroke={isSelected ? "red" : color}
                    className={
                        isSelected
                            ? "pulse"
                            : isSelectionActive
                            ? "opacity-30"
                            : ""
                    }
                    strokeWidth={borderWidth}
                    id={id}
                />
                {/* Vertici trascinabili - visibili e interattivi solo quando selezionati */}
                {isSelected && (
                    <>
                        <circle
                            cx={fromCoords.x}
                            cy={fromCoords.y}
                            r="5"
                            fill={color}
                            className="cursor-move hover:r-6 transition-all"
                            onMouseDown={e => handleVertexMouseDown(e, "from")}
                        />
                        {to && (
                            <circle
                                cx={toCoords.x}
                                cy={toCoords.y}
                                r="5"
                                fill={color}
                                className="cursor-move hover:r-6 transition-all"
                                onMouseDown={e =>
                                    handleVertexMouseDown(e, "to")
                                }
                            />
                        )}
                    </>
                )}
                <text
                    x={(fromCoords.x + toCoords.x) / 2 - 20}
                    y={(fromCoords.y + toCoords.y) / 2 - 10}
                    fill={color}
                    className={!isSelected && isSelectionActive && "opacity-30"}
                >
                    {line.id === 1
                        ? referenceHeight
                        : line.to
                        ? line.size
                        : "calcolando..."}{" "}
                    {line.to && "cm"}
                </text>
            </svg>

            {isDragging &&
                (() => {
                    const img = getImageElement();
                    if (!img) return null;
                    const rect = img.getBoundingClientRect();

                    // Calcola le distanze dai bordi
                    const distLeft = magnifierPosition.x - rect.left;
                    const distRight = rect.right - magnifierPosition.x;
                    const distTop = magnifierPosition.y - rect.top;
                    const distBottom = rect.bottom - magnifierPosition.y;

                    // Calcola gli offset per la posizione della lente
                    const offsetX = Math.min(50, distLeft, distRight);
                    const offsetY = Math.min(50, distTop, distBottom);

                    return (
                        <div
                            className="fixed pointer-events-none z-50"
                            style={{
                                left: magnifierPosition.x - offsetX,
                                top: magnifierPosition.y - offsetY,
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                                border: "3px solid black",
                                backgroundImage: `url(${image})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: `${rect.width * 3}px ${
                                    rect.height * 3
                                }px`,
                                backgroundPosition: `-${
                                    (magnifierPosition.x - rect.left) * 3 - 50
                                }px -${
                                    (magnifierPosition.y - rect.top) * 3 - 50
                                }px`,
                            }}
                        />
                    );
                })()}
        </>
    );
};

export default Line;
