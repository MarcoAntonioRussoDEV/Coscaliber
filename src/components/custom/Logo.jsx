import React from "react";
import { motion } from "motion/react";

// Configs
const PATH_LENGTH_INITIAL = 0;
const PATH_LENGTH_ANIMATE = 1;
const STROKE_WIDTH = 0.3;
const STROKE_COLOR = "#000000";
const DURATION = 1;
const FILL_DELAY = DURATION;
const DEFAULT_ANIMATION = {
    initial: {
        pathLength: PATH_LENGTH_INITIAL,
        fill: " rgba(214,11,82,0)",
    },
    animate: {
        pathLength: PATH_LENGTH_ANIMATE,
        fill: "rgba(214,11,82,1) ",
        strokeWidth: 0,
        transition: {
            pathLength: { duration: DURATION },
            fill: { duration: DURATION, delay: FILL_DELAY },
            strokeWidth: { duration: DURATION, delay: FILL_DELAY },
        },
    },
};
const Logo = () => {
    const wing = DEFAULT_ANIMATION;
    const head = DEFAULT_ANIMATION;
    const eye = DEFAULT_ANIMATION;
    const tail = DEFAULT_ANIMATION;

    const strokes = {
        stroke: STROKE_COLOR,
        strokeWidth: STROKE_WIDTH,
    };

    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            id="Livello_1"
            version="1.1"
            viewBox="10 7 150 150"
        >
            <linearGradient
                id="SVGID_1_"
                x1="-3.75"
                x2="119.033"
                y1="159.684"
                y2="50.056"
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset="0"
                    style={{ stopColor: "#662483", stopOpacity: 1 }}
                ></stop>
                <stop
                    offset="1"
                    style={{ stopColor: "#D60B52", stopOpacity: 1 }}
                ></stop>
            </linearGradient>
            <motion.path
                /* Wing */
                {...wing}
                {...strokes}
                d="M27.23 65.86c-2.03-2.78-5.94-3.38-8.71-1.36-2.78 2.03-3.39 5.94-1.36 8.71l57.17 78.31h15.44z"
            />
            <linearGradient
                id="SVGID_2_"
                x1="-0.312"
                x2="122.471"
                y1="163.534"
                y2="53.906"
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset="0"
                    stopColor="#662483"
                ></stop>
                <stop
                    offset="1"
                    stopColor="#D60B52"
                ></stop>
            </linearGradient>
            <motion.path
                /* Head */
                {...head}
                {...strokes}
                fill="url(#SVGID_2_)"
                d="M66.34 78.6c-2.93-3.93-4.48-8.6-4.48-13.52 0-12.48 10.15-22.63 22.63-22.63a22.6 22.6 0 0 1 20.85 13.82 6.24 6.24 0 0 0 3.4 3.35c1.54.63 3.24.61 4.77-.04.34-.15.67-.32.98-.52 1.67 2.24 3.4 4.55 5.18 6.89.29 1.05.53 2.01.73 2.9.3 1.39.55 2.77.74 4.11.2 1.35.35 2.74.44 4.13.11 1.61.15 2.94.14 4.18v.35c0 .57.11 1.14.32 1.67.7 1.77 1.33 3.2 1.97 4.5.73 1.48 1.51 2.93 2.32 4.3.29.5.6 1.01.94 1.54-1.06-.04-2.06-.12-3.04-.25a38 38 0 0 1-5.34-1.05c-.86-.24-1.78-.5-2.67-.82-.8-.28-1.64-.6-2.66-1.02l-11.47-4.71 9.57 7.88c.79.65 1.65 1.28 2.55 1.88.72.48 1.68 1.1 2.71 1.64 1.83 1 3.8 1.86 5.88 2.55 2.1.69 4.22 1.2 6.3 1.51 1.1.17 2.2.29 3.25.36 1.04.06 2.13.09 3.28.07.75-.01 1.47-.23 2.11-.61.95-.58 1.62-1.5 1.88-2.58a4.17 4.17 0 0 0-.49-3.16l-.2-.33c-.73-1.2-1.43-2.43-2.08-3.65-.6-1.14-1.19-2.37-1.81-3.76-.55-1.22-1.07-2.51-1.54-3.82-.39-1.1-.69-2.01-.96-2.85.12-1.51.19-2.86.2-4.13.01-1.7-.04-3.4-.16-5.05a57 57 0 0 0-.59-5.06c-.27-1.66-.61-3.33-1.02-4.99-.16-.65-.45-1.28-.83-1.82l-.11-.15c-3.27-4.68-6.03-8.61-8.88-12.53-1.43-1.99-2.95-4.1-4.53-6.22-.53-.72-1.06-1.44-1.6-2.17-.98-1.34-1.97-2.68-2.97-4.01l-4.62-6.14-4.69-6.09L98 16.51l-5.01-6.26c-1.6-2-4.47-2.54-6.69-1.24a5.21 5.21 0 0 0-1.87 7.12l1.37 2.35c1.14 1.97 2.32 4 3.51 5.98 1.19 2.01 2.46 4.11 4.02 6.65-2.87-.75-5.83-1.12-8.85-1.12-16.49 0-30.46 11.31-34.15 26.96L39.16 41.82c-2.04-2.76-5.96-3.35-8.72-1.31s-3.35 5.96-1.31 8.72l62.78 84.97c2.97 3.94 4.53 8.64 4.53 13.59 0 1.26-.11 2.51-.31 3.73h24.09z"
            ></motion.path>
            <linearGradient
                id="SVGID_3_"
                x1="0.673"
                x2="123.456"
                y1="167.433"
                y2="57.805"
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset="0"
                    stopColor="#662483"
                ></stop>
                <stop
                    offset="1"
                    stopColor="#D60B52"
                ></stop>
            </linearGradient>
            <motion.path
                /* Eye */
                {...eye}
                {...strokes}
                fill="url(#SVGID_3_)"
                d="M108.13 83.23c.35.11.72.17 1.08.17.6 0 1.19-.15 1.72-.45l5.07-2.84c.97-.55 1.62-1.49 1.77-2.6s-.22-2.19-1.02-2.98L105 62.94c-1.23-1.22-3.08-1.37-4.5-.38-1.42 1-1.9 2.79-1.17 4.36l6.68 14.44c.42.88 1.19 1.56 2.12 1.87"
            ></motion.path>
            <linearGradient
                id="SVGID_4_"
                x1="-1.947"
                x2="120.836"
                y1="161.839"
                y2="52.212"
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset="0"
                    stopColor="#662483"
                ></stop>
                <stop
                    offset="1"
                    stopColor="#D60B52"
                ></stop>
            </linearGradient>
            <motion.path
                /* Tail */
                {...tail}
                {...strokes}
                fill="url(#SVGID_4_)"
                d="M33.58 147.09a4.32 4.32 0 0 0 3.05 1.27c.87 0 1.74-.27 2.52-.81 1.75-1.23 2.35-3.45 1.45-5.39l-10.05-21.71a4.345 4.345 0 0 0-6.08-1.96l-7.62 4.27c-1.2.68-2 1.85-2.19 3.22a4.31 4.31 0 0 0 1.26 3.68z"
            ></motion.path>
        </motion.svg>
    );
};

export default Logo;
