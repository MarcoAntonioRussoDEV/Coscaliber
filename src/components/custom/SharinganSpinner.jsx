import React from "react";
import { motion } from "framer-motion";

const SharinganSpinner = ({ tomoe }) => {
    switch (tomoe) {
        case 1:
            return (
                <img
                    src="/sharingan_one_tomoe.svg"
                    className="animate-spin "
                />
            );
        case 2:
            return (
                <img
                    src="/sharingan_two_tomoe.svg"
                    className="animate-spin "
                />
            );
        default:
            return (
                <img
                    src="/sharingan_three_tomoe.svg"
                    className="animate-spin "
                />
            );
    }
};

export default SharinganSpinner;
