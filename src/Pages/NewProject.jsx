import React, { useState, useRef } from "react";
import Animator from "@/components/custom/Animator";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Stepper from "@/components/custom/Stepper";
import { useDispatch } from "react-redux";
import {
    setProjectColor,
    setProjectName,
} from "@/Redux/Redux-Slices/lineSlice";
import { HexAlphaColorPicker } from "react-colorful";
import HomepageCard from "@/components/custom/HomepageCard";

const NewProject = () => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const inputRef = useRef(null);

    const handleProjectName = e => {
        dispatch(setProjectName(e.target.value));
    };
    const handleProjectColor = color => {
        dispatch(setProjectColor(color));
    };

    const handleNextStep = () => {
        setStep(old => old + 1);
    };

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            handleNextStep();
        }
    };

    const stepOne = (
        <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    placeholder="Name of your project"
                    ref={inputRef}
                    onChange={handleProjectName}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );

    const stepTwo = (
        <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 items-center">
                <Label>Default line color</Label>
                <HexAlphaColorPicker
                    color="#fff"
                    onChange={handleProjectColor}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );

    const stepThree = (
        <Stepper
            step={step}
            setStep={setStep}
        />
    );

    return (
        <HomepageCard
            title={"Create project"}
            description={"Setup your project in a few steps"}
        >
            <CardContent>
                {step === 1 ? stepOne : step === 2 ? stepTwo : stepThree}
            </CardContent>
            {step >= 3 || (
                <CardFooter className="flex justify-between">
                    <Button
                        type="submit"
                        className="ms-auto"
                        onClick={handleNextStep}
                    >
                        Next
                    </Button>
                </CardFooter>
            )}
        </HomepageCard>
    );
};

export default NewProject;
