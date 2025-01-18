import { useCallback } from "react";
import { useSelector } from "react-redux";

const useCanvasElement = () => {
    const {
        elements,
        mouse: { x: mouseX, y: mouseY },
        canvas,
    } = useSelector(state => state.lines);

    const createElement = useCallback(() => {
        const element = document.createElement("div");
        element.classList.add(
            "absolute",
            "border",
            "border-white",
            "rounded-full",
            "w-4",
            "h-4",
            "-translate-x-1/2",
            "-translate-y-1/2"
            // elements.length,
        );
        element.id = `point-${elements.length}`;
        element.style.left = `${mouseX}px`;
        element.style.top = `${mouseY}px`;
        canvas.current.appendChild(element);
    }, [elements, mouseX, mouseY]);

    const removeElement = useCallback(() => {
        const element = canvas?.current?.querySelector(
            `.${elements.length - 1}`
        );
        element.remove();
    }, [elements]);

    return { createElement, removeElement };
};

export default useCanvasElement;
