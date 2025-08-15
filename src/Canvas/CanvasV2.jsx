import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setLastLineFrom,
    setLastLineTo,
    setMousePosition,
    setReferenceLineFrom,
    setReferenceLineTo,
    setSelectedLineId,
} from "@/Redux/Redux-Slices/lineSlice";
import LineV2 from "./LineV2";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const CanvasV2 = () => {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const dispatch = useDispatch();
    const { isMobile, openMobile, setOpenMobile } = useSidebar();

    const {
        bools: { isDrawing, dots },
        lines,
        referenceLine,
        image,
        projectName,
        utils: { selectedLineId },
    } = useSelector(state => state.lines);

    const isDebug = JSON.parse(
        import.meta.env.VITE_BORDER_DEBUG?.toLowerCase() || "false"
    );

    // Gestione del mouse tracking globale
    useEffect(() => {
        const handleMouseMove = e => {
            dispatch(setMousePosition({ x: e.clientX, y: e.clientY }));
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [dispatch]);

    // Apertura sidebar mobile
    useEffect(() => {
        if (isMobile) {
            setOpenMobile(true);
        }
    }, [isMobile, setOpenMobile]);

    // Logica per gestire il doppio click (due punti)
    const handleDoubleDotsLogic = (firstPointAction, secondPointAction) => {
        if (dots === 0) {
            dispatch(firstPointAction());
        } else {
            dispatch(secondPointAction());
        }
    };

    // Inizializzazione della linea di riferimento
    const initializeReferenceLine = () => {
        handleDoubleDotsLogic(setReferenceLineFrom, setReferenceLineTo);
    };

    // Gestione del click per disegnare linee
    const handleCanvasClick = e => {
        // Non fare nulla se stiamo trascinando una linea esistente
        if (e.target.closest(".line-vertex")) {
            return;
        }

        // Non fare nulla se il click è su una linea esistente (per selezione)
        if (e.target.tagName === "line" || e.target.tagName === "circle") {
            return;
        }

        if (isDrawing && image) {
            e.stopPropagation();
            console.log("Canvas click - Drawing mode:", {
                isDrawing,
                dots,
                hasReferenceLine: !!referenceLine,
                referenceLineComplete: referenceLine?.to,
            });

            // Se non abbiamo ancora una linea di riferimento completa
            if (!referenceLine || !referenceLine.to) {
                console.log("Setting reference line point");
                initializeReferenceLine();
            } else {
                // Altrimenti disegna una nuova linea di misurazione
                console.log("Setting measurement line point");
                handleDoubleDotsLogic(setLastLineFrom, setLastLineTo);
            }
        }
    };

    // Gestione del click fuori dalle linee per deselezionare
    const handleBackgroundClick = e => {
        // Se siamo in modalità disegno, non deselezionare
        if (isDrawing) {
            return;
        }

        // Se il click è sul background (non su una linea), deseleziona
        if (e.target === e.currentTarget || e.target.tagName === "img") {
            dispatch(setSelectedLineId(null));
        }
    };

    return (
        <div
            ref={canvasRef}
            className={`relative w-full h-screen overflow-hidden ${
                isDrawing ? "cursor-crosshair" : "cursor-default"
            }`}
            onClick={handleCanvasClick}
            onMouseDown={handleBackgroundClick}
        >
            {/* Header del progetto */}
            <header className="absolute top-0 left-0 right-0 z-20 p-4">
                <h1 className="text-center font-bold text-xl uppercase text-white drop-shadow-lg">
                    {projectName}
                </h1>
                <SidebarTrigger
                    className="absolute top-4 right-4 z-30"
                    isOpen={openMobile}
                />
            </header>

            {/* Container dell'immagine */}
            {image && (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            ref={imageRef}
                            src={image}
                            alt="Reference"
                            className={`
                                reference-image 
                                opacity-30 
                                w-full 
                                h-full 
                                object-contain 
                                rounded-xl 
                                pointer-events-none 
                                ${isDebug ? "border-2 border-red-500" : ""}
                            `}
                            draggable={false}
                        />

                        {/* SVG overlay per le linee */}
                        <svg
                            className="absolute inset-0 w-full h-full"
                            preserveAspectRatio="none"
                            style={{
                                pointerEvents: isDrawing ? "none" : "auto",
                            }}
                        >
                            {/* Rendering delle linee */}
                            {lines
                                .filter(line => !line.isHidden)
                                .map(line => (
                                    <LineV2
                                        key={line.id}
                                        line={line}
                                        imageRef={imageRef}
                                    />
                                ))}
                        </svg>
                    </div>
                </div>
            )}

            {/* Placeholder quando non c'è immagine */}
            {!image && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                        <p className="text-xl mb-4">
                            Nessuna immagine caricata
                        </p>
                        <p className="text-sm">
                            Carica un'immagine per iniziare le misurazioni
                        </p>
                    </div>
                </div>
            )}

            {/* Overlay di debug */}
            {isDebug && (
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
                    <div>Linee: {lines.length}</div>
                    <div>Disegno: {isDrawing ? "ON" : "OFF"}</div>
                    <div>Punti: {dots}</div>
                    <div>Selezione: {selectedLineId || "Nessuna"}</div>
                </div>
            )}
        </div>
    );
};

export default CanvasV2;
