import React from "react";
import { motion } from "motion/react";
import { motionConfig } from "@/config/motionConfig";

const Animator = ({ children, className }) => {
    return (
        <motion.div
            {...motionConfig}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default Animator;
