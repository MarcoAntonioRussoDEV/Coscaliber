import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    updateLineVertices,
    setSelectedLineId,
    deleteLine,
} from "@/Redux/Redux-Slices/lineSlice";
import LineModel from "@/Models/LineModel";

const LineV2 = ({ line, imageRef }) => {
    const dispatch = useDispatch();
    const [isDragging, setIsDragging] = useState(false);
    const [draggedVertex, setDraggedVertex] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

    const {
        calculated: { pixelToCmRatio, referenceHeight },
        utils: { selectedLineId },
        mouse: { x: mouseX, y: mouseY },
        image,
    } = useSelector(state => state.lines);

    const { from, to, color, borderWidth, id, name, size } = line;
    const isSelected = selectedLineId === id;
    const isSelectionActive = selectedLineId !== null;

    // Utility per ottenere il bounding rect dell'immagine
    const getImageBounds = useCallback(() => {
        if (!imageRef?.current) return null;
        return imageRef.current.getBoundingClientRect();
    }, [imageRef]);

    // Converti coordinate relative in assolute rispetto all'immagine
    const getAbsoluteCoordinates = useCallback(
        (relativeX, relativeY) => {
            const imageBounds = getImageBounds();
            if (!imageBounds) return { x: 0, y: 0 };

            return {
                x: (relativeX * imageBounds.width) / 100,
                y: (relativeY * imageBounds.height) / 100,
            };
        },
        [getImageBounds]
    );

    // Converti coordinate assolute dell'immagine in relative
    const getRelativeCoordinates = useCallback(
        (absoluteX, absoluteY) => {
            const imageBounds = getImageBounds();
            if (!imageBounds) return { x: 0, y: 0 };

            return {
                x: (absoluteX * 100) / imageBounds.width,
                y: (absoluteY * 100) / imageBounds.height,
            };
        },
        [getImageBounds]
    );

    // Converti coordinate mouse globali in coordinate relative all'immagine
    const globalToImageRelative = useCallback(
        (globalX, globalY) => {
            const imageBounds = getImageBounds();
            if (!imageBounds) return { x: 0, y: 0 };

            const imageX = globalX - imageBounds.left;
            const imageY = globalY - imageBounds.top;

            return getRelativeCoordinates(imageX, imageY);
        },
        [getImageBounds, getRelativeCoordinates]
    );

    // Calcola le coordinate assolute per il rendering
    const fromCoords = useMemo(
        () => getAbsoluteCoordinates(from.x, from.y),
        [from, getAbsoluteCoordinates]
    );

    const toCoords = useMemo(() => {
        if (!to) {
            // Se non c'è un punto finale, usa la posizione del mouse
            const mouseRelative = globalToImageRelative(mouseX, mouseY);
            return getAbsoluteCoordinates(mouseRelative.x, mouseRelative.y);
        }
        return getAbsoluteCoordinates(to.x, to.y);
    }, [to, mouseX, mouseY, getAbsoluteCoordinates, globalToImageRelative]);

    // Calcola la distanza in tempo reale per linee incomplete
    const calculateCurrentDistance = useCallback(() => {
        if (to) return size; // Usa la dimensione salvata se la linea è completa

        if (!pixelToCmRatio) return "0.00";

        const distance = Math.sqrt(
            Math.pow(toCoords.x - fromCoords.x, 2) +
                Math.pow(toCoords.y - fromCoords.y, 2)
        );

        return (distance / pixelToCmRatio).toFixed(2);
    }, [to, size, pixelToCmRatio, toCoords, fromCoords]);

    // Gestione del drag dei vertici
    const handleVertexMouseDown = useCallback(
        (e, vertex) => {
            e.preventDefault();
            e.stopPropagation();

            if (!isSelected) {
                dispatch(setSelectedLineId(id));
                return;
            }

            setIsDragging(true);
            setDraggedVertex(vertex);

            const rect = e.target.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        },
        [isSelected, id, dispatch]
    );

    // Gestione del movimento durante il drag
    useEffect(() => {
        if (!isDragging || !draggedVertex) return;

        const handleMouseMove = e => {
            const imageBounds = getImageBounds();
            if (!imageBounds) return;

            // Calcola la nuova posizione relativa all'immagine
            const imageX = e.clientX - imageBounds.left - dragOffset.x;
            const imageY = e.clientY - imageBounds.top - dragOffset.y;

            const newRelativeCoords = getRelativeCoordinates(imageX, imageY);

            // Clamp alle dimensioni dell'immagine
            newRelativeCoords.x = Math.max(
                0,
                Math.min(100, newRelativeCoords.x)
            );
            newRelativeCoords.y = Math.max(
                0,
                Math.min(100, newRelativeCoords.y)
            );

            setMagnifierPosition({ x: e.clientX, y: e.clientY });

            // Aggiorna la linea nello store
            const updatedLine = { ...line };
            if (draggedVertex === "from") {
                updatedLine.from = newRelativeCoords;
            } else {
                updatedLine.to = newRelativeCoords;
            }

            // Ricalcola la dimensione se necessario
            if (updatedLine.from && updatedLine.to && pixelToCmRatio) {
                const fromAbs = getAbsoluteCoordinates(
                    updatedLine.from.x,
                    updatedLine.from.y
                );
                const toAbs = getAbsoluteCoordinates(
                    updatedLine.to.x,
                    updatedLine.to.y
                );
                const distance = Math.sqrt(
                    Math.pow(toAbs.x - fromAbs.x, 2) +
                        Math.pow(toAbs.y - fromAbs.y, 2)
                );
                updatedLine.size = (distance / pixelToCmRatio).toFixed(2);
            }

            dispatch(updateLineVertices(updatedLine));
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setDraggedVertex(null);
            setDragOffset({ x: 0, y: 0 });
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [
        isDragging,
        draggedVertex,
        dragOffset,
        getImageBounds,
        getRelativeCoordinates,
        getAbsoluteCoordinates,
        line,
        pixelToCmRatio,
        dispatch,
    ]);

    // Gestione del click sulla linea per selezione
    const handleLineClick = useCallback(
        e => {
            e.stopPropagation();
            dispatch(setSelectedLineId(id));
        },
        [id, dispatch]
    );

    // Gestione del double click per eliminazione
    const handleLineDoubleClick = useCallback(
        e => {
            e.stopPropagation();
            if (window.confirm(`Eliminare la linea ${name || `#${id}`}?`)) {
                dispatch(deleteLine(id));
            }
        },
        [id, name, dispatch]
    );

    return (
        <g className="line-group">
            {/* Linea principale */}
            <line
                x1={fromCoords.x}
                y1={fromCoords.y}
                x2={toCoords.x}
                y2={toCoords.y}
                stroke={isSelected ? "#ef4444" : color}
                strokeWidth={borderWidth || 2}
                className={`
                    cursor-pointer
                    ${isSelected ? "drop-shadow-lg" : ""}
                    ${isSelectionActive && !isSelected ? "opacity-30" : ""}
                    transition-all duration-200
                `}
                style={{
                    pointerEvents:
                        isSelected || !isSelectionActive ? "stroke" : "none",
                    filter: isSelected
                        ? "drop-shadow(0 0 6px rgba(239, 68, 68, 0.6))"
                        : "none",
                }}
                onClick={handleLineClick}
                onDoubleClick={handleLineDoubleClick}
            />

            {/* Vertici trascinabili (visibili solo quando selezionata) */}
            {isSelected && (
                <>
                    <circle
                        className="line-vertex cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                        cx={fromCoords.x}
                        cy={fromCoords.y}
                        r="6"
                        fill={color}
                        stroke="white"
                        strokeWidth="2"
                        style={{ pointerEvents: "auto" }}
                        onMouseDown={e => handleVertexMouseDown(e, "from")}
                    />
                    {to && (
                        <circle
                            className="line-vertex cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                            cx={toCoords.x}
                            cy={toCoords.y}
                            r="6"
                            fill={color}
                            stroke="white"
                            strokeWidth="2"
                            style={{ pointerEvents: "auto" }}
                            onMouseDown={e => handleVertexMouseDown(e, "to")}
                        />
                    )}
                </>
            )}

            {/* Etichetta con la misurazione */}
            <g className="line-label">
                <text
                    x={(fromCoords.x + toCoords.x) / 2}
                    y={(fromCoords.y + toCoords.y) / 2 - 10}
                    fill={isSelected ? "#ef4444" : color}
                    fontSize="14"
                    fontWeight={isSelected ? "bold" : "normal"}
                    textAnchor="middle"
                    className={`
                        pointer-events-none select-none
                        ${isSelectionActive && !isSelected ? "opacity-30" : ""}
                        drop-shadow-sm
                    `}
                    style={{
                        filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.7))",
                        fill: isSelected ? "#ef4444" : color,
                    }}
                >
                    {id === 1 ? referenceHeight : calculateCurrentDistance()} cm
                </text>

                {/* Nome della linea (se presente) */}
                {name && (
                    <text
                        x={(fromCoords.x + toCoords.x) / 2}
                        y={(fromCoords.y + toCoords.y) / 2 + 15}
                        fill={isSelected ? "#ef4444" : color}
                        fontSize="12"
                        textAnchor="middle"
                        className={`
                            pointer-events-none select-none
                            ${
                                isSelectionActive && !isSelected
                                    ? "opacity-30"
                                    : ""
                            }
                        `}
                        style={{
                            filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.7))",
                        }}
                    >
                        {name}
                    </text>
                )}
            </g>

            {/* Magnifier durante il drag */}
            {isDragging && (
                <foreignObject
                    x={magnifierPosition.x - 50}
                    y={magnifierPosition.y - 50}
                    width="100"
                    height="100"
                    className="pointer-events-none"
                >
                    <div
                        className="w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden"
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: "300% 300%",
                            backgroundPosition: `${-(
                                (magnifierPosition.x / window.innerWidth) *
                                    300 -
                                150
                            )}% ${-(
                                (magnifierPosition.y / window.innerHeight) *
                                    300 -
                                150
                            )}%`,
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        {/* Crosshair nel magnifier */}
                        <div className="relative w-full h-full">
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-red-500"></div>
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-red-500"></div>
                        </div>
                    </div>
                </foreignObject>
            )}
        </g>
    );
};

export default LineV2;
