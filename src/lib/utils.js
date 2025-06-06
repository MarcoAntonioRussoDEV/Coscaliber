import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function getMouseResponsiveCoords(from, to, mousePosition) {
    const getScalingFactor = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return {
            scaleX: width / 100,
            scaleY: height / 100,
        };
    };

    const { scaleX, scaleY } = getScalingFactor();

    const scaleCoordinates = (x, y) => {
        return {
            x: x * scaleX,
            y: y * scaleY,
        };
    };

    const { x: scaledX1, y: scaledY1 } = scaleCoordinates(from.x, from.y);
    let scaledX2, scaledY2;

    if (to) {
        const scaledTo = scaleCoordinates(to.x, to.y);
        scaledX2 = scaledTo.x;
        scaledY2 = scaledTo.y;
    } else {
        const scaledMouse = scaleCoordinates(mousePosition.x, mousePosition.y);
        scaledX2 = scaledMouse.x;
        scaledY2 = scaledMouse.y;
    }

    return {
        x1: scaledX1,
        y1: scaledY1,
        x2: scaledX2,
        y2: scaledY2,
    };
}

export const convertCmToPx = (cm, dpi = 96) => {
    return (cm * dpi) / 2.54;
};

export const convertPxToCm = (px, dpi = 96) => {
    return (px * 2.54) / dpi;
};

export const calculateDistanceInPx = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
