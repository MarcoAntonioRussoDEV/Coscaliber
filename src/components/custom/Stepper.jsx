import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Spinner } from "../ui/spinner";
import { Check } from "lucide-react";
import ReactAnimatedEllipsis from "react-animated-ellipsis";
import { useNavigate } from "react-router";
import SharinganSpinner from "./SharinganSpinner";

export default function Stepper({ className }) {
    const [step, setStep] = useState(0);
    const [text, setText] = useState("");
    const navigate = useNavigate();
    // Calcola la larghezza della barra di progressione in base allo step corrente
    const progressWidth = step <= 3 && ((step - 1) / 2) * 100;
    const PROGRESS_TIMER = 1500;

    useEffect(() => {
        const timer = setInterval(() => {
            if (step <= 3) {
                setStep(prev => prev + 1);
            }
        }, PROGRESS_TIMER);

        const timeout = setTimeout(() => {
            clearInterval(timer);
        }, PROGRESS_TIMER * 4 + PROGRESS_TIMER / 5);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, []);

    const steps = {
        1: "espandendo il dominio",
        2: "concentrando il chakra",
        3: "attivando il sharingan",
    };

    useEffect(() => {
        setText(steps[step]);
        if (step === 4) {
            navigate("/editor");
        }
    }, [step]);

    return (
        <div
            className={`flex flex-col items-center space-y-4 p-4 ${className}`}
        >
            {/* Cerchi + Barra */}
            <div className="relative flex justify-between items-center w-64">
                {/* Barra di background */}
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-secondary rounded"></div>
                {/* Barra animata */}
                <motion.div
                    className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-primary rounded"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressWidth}%` }}
                    transition={{ duration: 0.4 }}
                />
                <Dot
                    step={1}
                    currentStep={step}
                />
                <Dot
                    step={2}
                    currentStep={step}
                />
                <Dot
                    step={3}
                    currentStep={step}
                />
            </div>
            <p className="text-center italic flex items-baseline gap-2">
                {text}
                <ReactAnimatedEllipsis />
            </p>
        </div>
    );
}

const Dot = ({ step, currentStep }) => {
    return (
        <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-secondary">
            <div
                className={`flex items-center justify-center w-8 h-8 rounded-full  ${
                    currentStep >= step
                        ? "bg-primary border-2 border-secondary text-primary-foreground"
                        : "bg-secondary"
                }`}
            >
                {currentStep === step ? (
                    <SharinganSpinner
                        className="text-primary-foreground"
                        size="sm"
                        tomoe={step}
                    />
                ) : currentStep > step ? (
                    <Check />
                ) : (
                    step
                )}
            </div>
        </div>
    );
};
