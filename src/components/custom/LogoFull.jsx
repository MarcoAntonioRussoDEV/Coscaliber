import React from "react";
import { motion } from "motion/react";

// Animation configs
const PATH_LENGTH_INITIAL = 0;
const PATH_LENGTH_ANIMATE = 1;
const STROKE_WIDTH = 0.3;
const STROKE_COLOR = "#342C38";
const DURATION = 1.5;
const FILL_DELAY = DURATION;
const STAGGER_DELAY = 0.1;

const DEFAULT_ANIMATION = {
    initial: {
        pathLength: PATH_LENGTH_INITIAL,
        fill: "rgba(52, 44, 56, 0)",
    },
    animate: {
        pathLength: PATH_LENGTH_ANIMATE,
        fill: "rgba(52, 44, 56, 1)",
        strokeWidth: 0,
        transition: {
            pathLength: { duration: DURATION },
            fill: { duration: DURATION, delay: FILL_DELAY },
            strokeWidth: { duration: DURATION, delay: FILL_DELAY },
        },
    },
};

const GRADIENT_ANIMATION = {
    initial: {
        pathLength: PATH_LENGTH_INITIAL,
        fill: "rgba(214, 11, 82, 0)",
    },
    animate: {
        pathLength: PATH_LENGTH_ANIMATE,
        fill: "url(#gradient)",
        strokeWidth: 0,
        transition: {
            pathLength: { duration: DURATION },
            fill: { duration: DURATION, delay: FILL_DELAY },
            strokeWidth: { duration: DURATION, delay: FILL_DELAY },
        },
    },
};

const LogoFull = ({ className = "" }) => {
    const strokes = {
        stroke: STROKE_COLOR,
        strokeWidth: STROKE_WIDTH,
    };

    // Create animated variants for each letter with staggered delays
    const createLetterAnimation = (delay = 0) => ({
        initial: {
            pathLength: PATH_LENGTH_INITIAL,
            fill: "rgba(52, 44, 56, 0)",
        },
        animate: {
            pathLength: PATH_LENGTH_ANIMATE,
            fill: "rgba(52, 44, 56, 1)",
            strokeWidth: 0,
            transition: {
                pathLength: { duration: DURATION, delay },
                fill: { duration: DURATION, delay: FILL_DELAY + delay },
                strokeWidth: { duration: DURATION, delay: FILL_DELAY + delay },
            },
        },
    });

    const createGraphicAnimation = (delay = 0, gradientId = "gradient") => ({
        initial: {
            pathLength: PATH_LENGTH_INITIAL,
            fillOpacity: 0,
        },
        animate: {
            pathLength: PATH_LENGTH_ANIMATE,
            fillOpacity: 1,
            strokeWidth: 0,
            transition: {
                pathLength: { duration: DURATION, delay },
                fillOpacity: { duration: DURATION, delay: FILL_DELAY + delay },
                strokeWidth: { duration: DURATION, delay: FILL_DELAY + delay },
            },
        },
    });

    return (
        <motion.svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            id="Livello_1"
            version="1.1"
            viewBox="60 230 750 140"
            initial="initial"
            animate="animate"
        >
            {/* Define gradients */}
            <defs>
                <linearGradient
                    id="gradient"
                    gradientUnits="userSpaceOnUse"
                    x1="46.5418"
                    y1="368.5881"
                    x2="158.2699"
                    y2="268.8309"
                >
                    <stop
                        offset="0"
                        stopColor="#662483"
                        stopOpacity="1"
                    />
                    <stop
                        offset="1"
                        stopColor="#D60B52"
                        stopOpacity="1"
                    />
                </linearGradient>
                <linearGradient
                    id="gradient2"
                    gradientUnits="userSpaceOnUse"
                    x1="49.6703"
                    y1="372.0919"
                    x2="161.3983"
                    y2="272.3348"
                >
                    <stop
                        offset="0"
                        stopColor="#662483"
                        stopOpacity="1"
                    />
                    <stop
                        offset="1"
                        stopColor="#D60B52"
                        stopOpacity="1"
                    />
                </linearGradient>
                <linearGradient
                    id="gradient3"
                    gradientUnits="userSpaceOnUse"
                    x1="50.5669"
                    y1="375.6393"
                    x2="162.2949"
                    y2="275.8821"
                >
                    <stop
                        offset="0"
                        stopColor="#662483"
                        stopOpacity="1"
                    />
                    <stop
                        offset="1"
                        stopColor="#D60B52"
                        stopOpacity="1"
                    />
                </linearGradient>
                <linearGradient
                    id="gradient4"
                    gradientUnits="userSpaceOnUse"
                    x1="48.1828"
                    y1="370.5497"
                    x2="159.9109"
                    y2="270.7925"
                >
                    <stop
                        offset="0"
                        stopColor="#662483"
                        stopOpacity="1"
                    />
                    <stop
                        offset="1"
                        stopColor="#D60B52"
                        stopOpacity="1"
                    />
                </linearGradient>
            </defs>

            <g>
                {/* COSCALIBER text */}
                <motion.path
                    {...createLetterAnimation(0)}
                    {...strokes}
                    d="M252.2,300.9l13.7,9l-0.1,0.1c-3,5.1-6.9,9-12,11.9c-5,2.9-10.4,4.3-16.3,4.3c-4.6,0-8.8-0.9-12.8-2.6
                    c-4-1.7-7.4-4.1-10.4-7c-3-3-5.3-6.4-7-10.4c-1.7-4-2.6-8.2-2.6-12.7c0-4.5,0.9-8.7,2.6-12.7c1.7-4,4.1-7.4,7-10.4
                    c3-3,6.4-5.3,10.4-7c4-1.7,8.2-2.6,12.8-2.6c5.8,0,11.2,1.4,16.3,4.3c5,2.9,9,6.8,12,11.9l0.1,0.1l-13.8,9l-0.1-0.1
                    c-1.4-3.1-3.3-5.7-5.9-7.6c-2.6-1.9-5.4-2.9-8.5-2.9c-2.3,0-4.4,0.5-6.4,1.5c-2,1-3.7,2.3-5.1,3.9c-1.4,1.6-2.6,3.5-3.4,5.7
                    c-0.8,2.2-1.3,4.5-1.3,6.9c0,2.4,0.4,4.7,1.3,6.8c0.8,2.1,2,3.9,3.4,5.5c1.4,1.6,3.1,2.8,5.1,3.7c2,0.9,4.1,1.3,6.4,1.3
                    c3.1,0,6-0.9,8.5-2.6c2.6-1.7,4.5-4.2,5.9-7.3l0.1-0.3L252.2,300.9z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY)}
                    {...strokes}
                    d="M302.5,260.8c4.6,0,8.8,0.9,12.8,2.6c4,1.7,7.4,4.1,10.4,7c3,3,5.3,6.4,7,10.4c1.7,4,2.6,8.2,2.6,12.7
                    c0,4.5-0.9,8.7-2.6,12.7c-1.7,4-4.1,7.4-7,10.4c-3,3-6.4,5.3-10.4,7c-4,1.7-8.2,2.6-12.8,2.6c-4.6,0-8.8-0.9-12.8-2.6
                    c-4-1.7-7.4-4.1-10.4-7c-3-3-5.3-6.4-7-10.4c-1.7-4-2.6-8.2-2.6-12.7c0-4.5,0.9-8.7,2.6-12.7c1.7-4,4.1-7.4,7-10.4
                    c3-3,6.4-5.3,10.4-7C293.7,261.7,297.9,260.8,302.5,260.8z M302.5,311.1c2.1,0,4.1-0.5,5.9-1.4c1.8-0.9,3.4-2.2,4.8-3.9
                    c1.4-1.6,2.5-3.5,3.3-5.7c0.8-2.2,1.2-4.5,1.2-7c0-2.4-0.4-4.6-1.2-6.8c-0.8-2.2-1.9-4-3.3-5.6c-1.4-1.6-3-2.8-4.8-3.7
                    c-1.8-0.9-3.8-1.4-5.9-1.4c-2.1,0-4.1,0.5-6,1.4c-1.9,0.9-3.5,2.2-4.9,3.7c-1.4,1.6-2.5,3.4-3.3,5.6c-0.8,2.2-1.2,4.4-1.2,6.8
                    c0,2.5,0.4,4.9,1.2,7c0.8,2.2,1.9,4.1,3.3,5.7c1.4,1.6,3,2.9,4.9,3.9C298.4,310.6,300.4,311.1,302.5,311.1z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 2)}
                    {...strokes}
                    d="M369.1,287.5c2.8,0.9,5.3,1.9,7.7,2.8c2.3,1,4.3,2.1,6.1,3.5c1.7,1.4,3.1,3,4.1,4.9c1,1.9,1.5,4.2,1.5,6.8v0.1
                    c0,6.4-2.1,11.4-6.4,15.1c-4.3,3.6-10.2,5.4-17.9,5.4c-4.8,0-9.5-0.8-14.2-2.5c-4.6-1.7-9-4-13-7.1l-0.1-0.1l0.1-0.1l8.6-13.6
                    l0.1,0.1c2.5,2.7,5.4,4.7,8.6,6.1c3.2,1.4,6.6,2.1,10.3,2.1c5,0,7.5-1.6,7.5-4.8c0-1.5-0.8-2.7-2.4-3.4c-1.6-0.8-3.5-1.5-5.7-2.1
                    c-0.4-0.2-0.8-0.3-1.2-0.3c-0.4,0-0.8-0.1-1.2-0.3c-2.5-0.7-5.1-1.4-7.6-2.2c-2.5-0.8-4.8-1.9-6.8-3.3c-2-1.4-3.7-3.2-5-5.3
                    c-1.3-2.1-2-4.9-2-8.3v-0.3c0-2.9,0.5-5.6,1.6-8.1c1.1-2.4,2.7-4.5,4.7-6.3c2-1.8,4.5-3.1,7.3-4.1c2.9-1,6-1.5,9.5-1.5
                    c4.1,0,8.1,0.6,12.3,1.8c4.1,1.2,8,3,11.5,5.4v0.3l-7.7,14.1l-0.1-0.1c-1.9-1.9-4.3-3.5-7.2-4.6c-2.9-1.1-5.9-1.7-9.1-1.7
                    c-0.6,0-1.3,0-2,0.1c-0.8,0.1-1.5,0.3-2.1,0.6c-0.6,0.3-1.2,0.8-1.6,1.3c-0.4,0.6-0.6,1.3-0.6,2.3c0,0.8,0.3,1.5,1,2.1
                    c0.7,0.6,1.5,1.2,2.6,1.8c1.1,0.5,2.2,1.1,3.5,1.6c1.3,0.5,2.6,1,3.9,1.4c0.3,0,0.5,0,0.8,0.1C368.5,287.4,368.8,287.4,369.1,287.5z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 3)}
                    {...strokes}
                    d="M439.8,300.9l13.7,9l-0.1,0.1c-3,5.1-6.9,9-12,11.9c-5,2.9-10.4,4.3-16.3,4.3c-4.6,0-8.8-0.9-12.8-2.6
                    c-4-1.7-7.4-4.1-10.4-7c-3-3-5.3-6.4-7-10.4c-1.7-4-2.6-8.2-2.6-12.7c0-4.5,0.9-8.7,2.6-12.7c1.7-4,4.1-7.4,7-10.4
                    c3-3,6.4-5.3,10.4-7c4-1.7,8.2-2.6,12.8-2.6c5.8,0,11.2,1.4,16.3,4.3c5,2.9,9,6.8,12,11.9l0.1,0.1l-13.8,9l-0.1-0.1
                    c-1.4-3.1-3.3-5.7-5.9-7.6c-2.6-1.9-5.4-2.9-8.5-2.9c-2.3,0-4.4,0.5-6.4,1.5c-2,1-3.7,2.3-5.1,3.9c-1.4,1.6-2.6,3.5-3.4,5.7
                    c-0.8,2.2-1.3,4.5-1.3,6.9c0,2.4,0.4,4.7,1.3,6.8c0.8,2.1,2,3.9,3.4,5.5c1.4,1.6,3.1,2.8,5.1,3.7c2,0.9,4.1,1.3,6.4,1.3
                    c3.1,0,6-0.9,8.5-2.6c2.6-1.7,4.5-4.2,5.9-7.3l0.1-0.3L439.8,300.9z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 4)}
                    {...strokes}
                    d="M522.8,261.8v63.3h-16.6v-31.7c0-2.5-0.5-4.7-1.4-6.9c-0.9-2.1-2.2-4-3.9-5.6c-1.6-1.6-3.5-2.9-5.7-3.7
                    c-2.2-0.9-4.4-1.3-6.8-1.3c-2.4,0-4.7,0.5-6.8,1.4c-2.1,0.9-4,2.2-5.6,3.7s-2.9,3.4-3.9,5.6c-0.9,2.2-1.4,4.5-1.4,6.9
                    c0,2.4,0.5,4.6,1.4,6.7c0.9,2.1,2.2,4,3.9,5.6c1.6,1.6,3.5,2.9,5.6,3.8c2.1,0.9,4.4,1.4,6.8,1.4c2.6,0,4.9-0.5,6.7-1.4h0.1v0.3
                    l6.3,11.3l-0.1,0.1c-4.1,3.2-9.2,4.8-15.3,4.8c-4.5,0-8.7-0.8-12.7-2.5c-4-1.7-7.4-4-10.4-7c-3-3-5.3-6.4-7-10.4
                    c-1.7-4-2.6-8.2-2.6-12.7c0-4.6,0.9-8.8,2.6-12.8c1.7-4,4.1-7.4,7-10.4c3-3,6.4-5.3,10.4-7c4-1.7,8.2-2.6,12.7-2.6
                    c4.4,0,8.2,0.8,11.5,2.4c3.3,1.6,6.1,4,8.5,7.1v-8.5H522.8z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 5)}
                    {...strokes}
                    d="M548.5,236.5v88.6h-16.8l0.1-88.6H548.5z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 6)}
                    {...strokes}
                    d="M556.1,236.5h16.8v14.8h-16.8V236.5z M556.1,325.1v-63.3h16.8v63.3H556.1z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 7)}
                    {...strokes}
                    d="M617.1,261.1c4.5,0,8.7,0.8,12.7,2.5c4,1.7,7.4,4,10.4,7c3,3,5.3,6.4,7,10.4c1.7,4,2.6,8.2,2.6,12.7
                    c0,4.5-0.9,8.7-2.6,12.7c-1.7,4-4.1,7.4-7,10.4c-3,3-6.4,5.3-10.4,7c-4,1.7-8.2,2.5-12.7,2.5c-8.7,0-15.3-3.2-19.9-9.6v8.6h-16.7
                    v-88.6h16.8v57.1c0,2.4,0.5,4.7,1.4,6.8c0.9,2.1,2.2,3.9,3.7,5.5c1.6,1.6,3.4,2.8,5.6,3.7c2.2,0.9,4.5,1.4,6.9,1.4
                    c2.4,0,4.6-0.5,6.8-1.4c2.2-0.9,4-2.2,5.6-3.7c1.6-1.6,2.8-3.4,3.7-5.5c0.9-2.1,1.4-4.4,1.4-6.8c0-2.4-0.5-4.7-1.4-6.8
                    c-0.9-2.1-2.2-4-3.7-5.6c-1.6-1.6-3.4-2.8-5.6-3.7c-2.2-0.9-4.4-1.3-6.8-1.3c-2.3,0-4.6,0.5-6.8,1.4l-0.1,0.1l-0.1-0.3l-6.2-11.4
                    l0.1-0.1C605.9,262.7,611,261.1,617.1,261.1z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 8)}
                    {...strokes}
                    d="M687.7,260.8c4.5,0,8.7,0.9,12.7,2.6c4,1.7,7.4,4.1,10.4,7c3,3,5.3,6.4,7,10.4c1.7,4,2.6,8.2,2.6,12.8
                    c0,2.4-0.3,4.8-0.8,7.1l-0.1,0.3h-32.2l-8.1-12.9h24.1c-1.2-3.5-3.1-6.5-5.9-8.7c-2.7-2.3-6-3.4-9.7-3.4c-2.3,0-4.4,0.5-6.5,1.4
                    c-2,0.9-3.8,2.2-5.3,3.7c-1.5,1.6-2.6,3.4-3.5,5.6c-0.8,2.1-1.3,4.5-1.3,7c0,1.9,0.4,3.9,1.1,6c0.8,2.1,1.9,3.9,3.3,5.6
                    c1.4,1.7,3.2,3.1,5.2,4.2c2,1.1,4.3,1.7,6.8,1.7c2.3,0,4.4-0.3,6.3-0.9c1.9-0.6,3.7-2,5.4-4.2l0.1-0.1l0.3,0.1l14.7,6.5l-0.3,0.3
                    c-3,4.3-6.9,7.6-11.6,10c-4.7,2.4-9.6,3.6-14.9,3.6c-4.6,0-8.8-0.8-12.9-2.5c-4-1.7-7.5-4-10.4-7c-3-3-5.3-6.4-7-10.4
                    c-1.7-4-2.6-8.2-2.6-12.7c0-4.6,0.9-8.8,2.6-12.8c1.7-4,4.1-7.4,7-10.4c3-3,6.4-5.3,10.4-7C678.9,261.7,683.2,260.8,687.7,260.8z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 9)}
                    {...strokes}
                    d="M778.4,264.4l-1.5,2.5l-6.5,11.5l-0.1-0.1c-2.8-1.6-5.8-2.4-9-2.4c-2.2,0-4.3,0.4-6.2,1.1
                    c-1.9,0.7-3.7,1.7-5.2,3c-1.5,1.3-2.8,2.8-3.9,4.6c-1.1,1.8-1.8,3.7-2.1,5.7v34.8h-17.2v-63.3H744v8.2c4.5-6.2,11-9.2,19.6-9.2
                    c5.1,0,10,1.2,14.7,3.5H778.4z"
                />
            </g>

            {/* Subtitle text */}
            <g>
                {/* SCALEIT text */}
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 10)}
                    {...strokes}
                    d="M205.4,358l3-3c0.8,1.2,2.3,1.9,3.8,1.9c1.1,0,2.1-0.4,2.1-1.2c0-1-1.9-1.8-3.8-2.7c-2.4-1-4.5-2.6-4.5-5.5
                    c0-3.3,3.1-5.6,6.7-5.6c2.9,0,5.1,1.4,5.9,3.2l-2.9,2.8c-0.6-1-2-1.4-2.9-1.4c-1,0-1.8,0.5-1.8,1.2c0,0.9,1.3,1.2,3.4,2
                    c3,1.2,4.9,3.1,4.9,5.9c0,3.6-3.4,5.9-7.2,5.9C209.2,361.4,206.3,360,205.4,358z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 10.1)}
                    {...strokes}
                    d="M225.7,351.7c0-5.6,4.5-9.9,10.4-9.9c2.4,0,5.1,1.1,7,2.9l-2.9,3.7c-1.2-1.1-2.7-1.8-4.1-1.8
                    c-2.9,0-5.3,2.2-5.3,5.1c0,2.9,2.5,5.1,5.2,5.1c1.6,0,3-0.8,4.2-1.8l2.9,3.8c-1.8,1.6-4.2,2.8-7.1,2.8
                    C230.7,361.6,225.7,357.6,225.7,351.7z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 10.2)}
                    {...strokes}
                    d="M262.3,359h-7.1l-1,2.2h-5.5l8.8-19.2h2.4l8.8,19.2h-5.5L262.3,359z M260.7,355.3l-1.9-4.5l-2,4.5H260.7z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 10.3)}
                    {...strokes}
                    d="M287.7,356.4v4.7h-12.3v-18.9h5v14.2H287.7z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 10.4)}
                    {...strokes}
                    d="M299.6,346.9v2.6h6v4.2h-6v2.7h7.3v4.7h-12.3v-18.9h12.3v4.7H299.6z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 10.5)}
                    {...strokes}
                    d="M326.7,342.2h5v18.9h-5V342.2z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 10.6)}
                    {...strokes}
                    d="M352.8,346.9h-4.5v14.2h-5v-14.2h-4.5v-4.7h14.1V346.9z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 10.7)}
                    {...strokes}
                    d="M357.5,364.8c0.8,0,2.3-0.6,2.3-2.2c0-0.5-0.1-0.7-0.2-0.9c-1.1,0-2.3-1.1-2.3-2.6c0-1.6,1.4-3.1,3.3-3.1
                    c2,0,3.3,1.6,3.3,4c0,2.8-1.6,5.7-4.4,5.7C358.3,365.7,357.5,365.1,357.5,364.8z"
                />

                {/* DESIGN IT text */}
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 11)}
                    {...strokes}
                    d="M400.2,351.7c0,5.9-3.9,9.4-10.4,9.4h-6.2v-18.9l6.2,0C396.2,342.2,400.2,345.8,400.2,351.7z M395.1,351.7
                    c0-3-2.1-4.8-5.5-4.8h-1.2v9.5h1.2C393.1,356.4,395.1,354.6,395.1,351.7z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 11.1)}
                    {...strokes}
                    d="M412.4,346.9v2.6h6v4.2h-6v2.7h7.3v4.7h-12.3v-18.9h12.3v4.7H412.4z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 11.2)}
                    {...strokes}
                    d="M426.4,358l3-3c0.8,1.2,2.3,1.9,3.8,1.9c1.1,0,2.1-0.4,2.1-1.2c0-1-1.9-1.8-3.8-2.7c-2.4-1-4.5-2.6-4.5-5.5
                    c0-3.3,3.1-5.6,6.7-5.6c2.9,0,5.1,1.4,5.9,3.2l-2.9,2.8c-0.6-1-2-1.4-2.9-1.4c-1,0-1.8,0.5-1.8,1.2c0,0.9,1.3,1.2,3.4,2
                    c3,1.2,4.9,3.1,4.9,5.9c0,3.6-3.4,5.9-7.2,5.9C430.1,361.4,427.3,360,426.4,358z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 11.3)}
                    {...strokes}
                    d="M447.5,342.2h5v18.9h-5V342.2z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 11.4)}
                    {...strokes}
                    d="M480.1,352.1c0,5.8-4.3,9.5-9.7,9.5c-6,0-10.6-4.5-10.6-9.9c0-5.4,4.6-10,10.4-10c2.4,0,5.2,1.1,6.8,2.5
                    l-2.8,3.8c-1.1-1-2.6-1.6-4-1.6c-2.8,0-5.3,2.3-5.3,5.2c0,2.7,2.1,5.2,5.6,5.2c2.3,0,3.9-1.1,4-2.9h-4.3v-3.7h9.7
                    C480.1,350.9,480.1,351.5,480.1,352.1z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 11.5)}
                    {...strokes}
                    d="M503.8,342.2v19.2h-1.6l-9.7-9.4v9.3h-5V342h1.6l9.7,9.4v-9.2H503.8z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 11.6)}
                    {...strokes}
                    d="M524,342.2h5v18.9h-5V342.2z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 11.7)}
                    {...strokes}
                    d="M550.1,346.9h-4.5v14.2h-5v-14.2H536v-4.7h14.1V346.9z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 11.8)}
                    {...strokes}
                    d="M554.8,364.8c0.8,0,2.3-0.6,2.3-2.2c0-0.5-0.1-0.7-0.2-0.9c-1.1,0-2.3-1.1-2.3-2.6c0-1.6,1.4-3.1,3.3-3.1
                    c2,0,3.3,1.6,3.3,4c0,2.8-1.6,5.7-4.4,5.7C555.6,365.7,554.8,365.1,554.8,364.8z"
                />

                {/* COSPLAY text */}
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 12)}
                    {...strokes}
                    d="M580.1,351.7c0-5.6,4.5-9.9,10.4-9.9c2.4,0,5.1,1.1,7,2.9l-2.9,3.7c-1.2-1.1-2.7-1.8-4.1-1.8
                    c-2.9,0-5.3,2.2-5.3,5.1c0,2.9,2.5,5.1,5.2,5.1c1.6,0,3-0.8,4.2-1.8l2.9,3.8c-1.8,1.6-4.2,2.8-7.1,2.8
                    C585.1,361.6,580.1,357.6,580.1,351.7z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 12.1)}
                    {...strokes}
                    d="M602.9,351.7c0-5.7,4.5-10,10.4-10c5.9,0,10.4,4.3,10.4,10c0,5.6-4.5,9.9-10.4,9.9
                    C607.4,361.6,602.9,357.4,602.9,351.7z M618.6,351.7c0-2.9-2.3-5.2-5.3-5.2s-5.3,2.3-5.3,5.2c0,2.9,2.3,5.2,5.3,5.2
                    S618.6,354.6,618.6,351.7z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 12.2)}
                    {...strokes}
                    d="M630,358l3-3c0.8,1.2,2.3,1.9,3.8,1.9c1.1,0,2.1-0.4,2.1-1.2c0-1-1.9-1.8-3.8-2.7c-2.4-1-4.5-2.6-4.5-5.5
                    c0-3.3,3.1-5.6,6.7-5.6c2.9,0,5.1,1.4,5.9,3.2l-2.9,2.8c-0.6-1-2-1.4-2.9-1.4c-1,0-1.8,0.5-1.8,1.2c0,0.9,1.3,1.2,3.4,2
                    c3,1.2,4.9,3.1,4.9,5.9c0,3.6-3.4,5.9-7.2,5.9C633.8,361.4,630.9,360,630,358z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 12.3)}
                    {...strokes}
                    d="M651.2,342.2h7.2c3.9,0,7.2,2.9,7.2,6.6c0,3.7-3.2,6.7-7.2,6.7h-2.1v5.6h-5V342.2z M660.6,348.9
                    c0-1.2-1-2-2.3-2h-2.1v4.1l2.1,0C659.7,351,660.6,350,660.6,348.9z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 12.4)}
                    {...strokes}
                    d="M684.7,356.4v4.7h-12.3v-18.9h5v14.2H684.7z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 12.5)}
                    {...strokes}
                    d="M703.8,359h-7.1l-1,2.2h-5.5l8.8-19.2h2.4l8.8,19.2h-5.5L703.8,359z M702.2,355.3l-1.9-4.5l-2,4.5H702.2z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 12.6)}
                    {...strokes}
                    d="M717.3,353l-5.8-10.8h5.7l2.6,5.5l2.6-5.5h5.7l-5.9,10.8v8.2h-5V353z"
                />

                {/* PLAYIT text */}
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 13)}
                    {...strokes}
                    d="M747,342.2h5v18.9h-5V342.2z"
                />
                <motion.path
                    {...createLetterAnimation(STAGGER_DELAY * 13.1)}
                    {...strokes}
                    d="M773.1,346.9h-4.5v14.2h-5v-14.2H759v-4.7h14.1V346.9z"
                />
            </g>

            {/* Graphic elements */}
            <g>
                <motion.path
                    {...createGraphicAnimation(STAGGER_DELAY * 15, "gradient")}
                    stroke={STROKE_COLOR}
                    strokeWidth={STROKE_WIDTH}
                    fill="url(#gradient)"
                    d="M74.7,283.2c-1.8-2.5-5.4-3.1-7.9-1.2c-2.5,1.8-3.1,5.4-1.2,7.9l52,71.3h14.1L74.7,283.2z"
                />
                <motion.path
                    {...createGraphicAnimation(STAGGER_DELAY * 16, "gradient2")}
                    stroke={STROKE_COLOR}
                    strokeWidth={STROKE_WIDTH}
                    fill="url(#gradient2)"
                    d="M110.3,294.8c-2.7-3.6-4.1-7.8-4.1-12.3c0-11.4,9.2-20.6,20.6-20.6c8.3,0,15.7,4.9,19,12.6
                    c0.6,1.4,1.7,2.5,3.1,3c1.4,0.6,2.9,0.6,4.3,0c0.3-0.1,0.6-0.3,0.9-0.5c1.5,2,3.1,4.1,4.7,6.3c0.3,1,0.5,1.8,0.7,2.6
                    c0.3,1.3,0.5,2.5,0.7,3.7c0.2,1.2,0.3,2.5,0.4,3.8c0.1,1.5,0.1,2.7,0.1,3.8l0,0.3c0,0.5,0.1,1,0.3,1.5c0.6,1.6,1.2,2.9,1.8,4.1
                    c0.7,1.3,1.4,2.7,2.1,3.9c0.3,0.5,0.5,0.9,0.9,1.4c-1,0-1.9-0.1-2.8-0.2c-1.6-0.2-3.2-0.5-4.9-1c-0.8-0.2-1.6-0.5-2.4-0.7
                    c-0.7-0.3-1.5-0.5-2.4-0.9l-10.4-4.3l8.7,7.2c0.7,0.6,1.5,1.2,2.3,1.7c0.7,0.4,1.5,1,2.5,1.5c1.7,0.9,3.5,1.7,5.3,2.3
                    c1.9,0.6,3.8,1.1,5.7,1.4c1,0.2,2,0.3,3,0.3c0.9,0.1,1.9,0.1,3,0.1c0.7,0,1.3-0.2,1.9-0.6c0.9-0.5,1.5-1.4,1.7-2.4
                    c0.2-1,0.1-2-0.5-2.9l-0.2-0.3c-0.7-1.1-1.3-2.2-1.9-3.3c-0.5-1-1.1-2.2-1.6-3.4c-0.5-1.1-1-2.3-1.4-3.5c-0.4-1-0.6-1.8-0.9-2.6
                    c0.1-1.4,0.2-2.6,0.2-3.8c0-1.5,0-3.1-0.1-4.6c-0.1-1.5-0.3-3.1-0.5-4.6c-0.2-1.5-0.6-3-0.9-4.5c-0.1-0.6-0.4-1.2-0.8-1.7l-0.1-0.1
                    c-3-4.3-5.5-7.8-8.1-11.4c-1.3-1.8-2.7-3.7-4.1-5.7c-0.5-0.7-1-1.3-1.5-2c-0.9-1.2-1.8-2.4-2.7-3.7l-4.2-5.6l-4.3-5.5l-4.3-5.5
                    l-4.6-5.7c-1.5-1.8-4.1-2.3-6.1-1.1c-2.3,1.3-3,4.2-1.7,6.5l1.2,2.1c1,1.8,2.1,3.6,3.2,5.4c1.1,1.8,2.2,3.7,3.7,6
                    c-2.6-0.7-5.3-1-8.1-1c-15,0-27.7,10.3-31.1,24.5l-10.2-13.8c-1.9-2.5-5.4-3.1-7.9-1.2c-2.5,1.9-3,5.4-1.2,7.9l57.1,77.3
                    c2.7,3.6,4.1,7.9,4.1,12.4c0,1.1-0.1,2.3-0.3,3.4h21.9L110.3,294.8z"
                />
                <motion.path
                    {...createGraphicAnimation(STAGGER_DELAY * 17, "gradient3")}
                    stroke={STROKE_COLOR}
                    strokeWidth={STROKE_WIDTH}
                    fill="url(#gradient3)"
                    d="M148.4,299c0.3,0.1,0.7,0.2,1,0.2c0.5,0,1.1-0.1,1.6-0.4l4.6-2.6c0.9-0.5,1.5-1.4,1.6-2.4c0.1-1-0.2-2-0.9-2.7
                    l-10.7-10.6c-1.1-1.1-2.8-1.2-4.1-0.3c-1.3,0.9-1.7,2.5-1.1,4l6.1,13.1C146.8,298.1,147.5,298.7,148.4,299z"
                />
                <motion.path
                    {...createGraphicAnimation(STAGGER_DELAY * 18, "gradient4")}
                    stroke={STROKE_COLOR}
                    strokeWidth={STROKE_WIDTH}
                    fill="url(#gradient4)"
                    d="M80.5,357.1c0.8,0.8,1.8,1.2,2.8,1.2c0.8,0,1.6-0.2,2.3-0.7c1.6-1.1,2.1-3.1,1.3-4.9l-9.1-19.8
                    c-0.5-1-1.3-1.8-2.4-2.1c-1-0.3-2.2-0.2-3.2,0.3l-6.9,3.9c-1.1,0.6-1.8,1.7-2,2.9c-0.2,1.2,0.2,2.5,1.1,3.3L80.5,357.1z"
                />
            </g>
        </motion.svg>
    );
};

export default LogoFull;
