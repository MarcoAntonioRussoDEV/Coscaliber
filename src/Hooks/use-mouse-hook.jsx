import { useEffect, useState } from "react";

export default function useMouseHook() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = event => {
            const rect = event.target.getBoundingClientRect();
            setMousePosition({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return mousePosition;
}
