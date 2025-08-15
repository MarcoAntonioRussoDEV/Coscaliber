import React, { useState, useRef, useEffect } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Stepper from "@/components/custom/Stepper";
import { useDispatch, useSelector } from "react-redux";
import {
    setProjectColor,
    setProjectName,
    setTutorial,
} from "@/Redux/Redux-Slices/lineSlice";
import { HexAlphaColorPicker } from "react-colorful";
import HomepageCard from "@/components/custom/HomepageCard";
import useTranslateCapitalize from "@/Hooks/use-translate-capitalize";
import { Switch } from "@/components/ui/switch";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const NewProject = () => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const inputRef = useRef(null);
    const tc = useTranslateCapitalize("homepage");
    const { tutorial } = useSelector(state => state.lines);

    const handleProjectName = e => {
        dispatch(setProjectName(e.target.value));
    };
    const handleProjectColor = color => {
        dispatch(setProjectColor(color));
    };

    const handlePreviousStep = () => {
        setStep(old => (old - 1 < 1 ? 1 : old - 1));
    };
    const handleNextStep = () => {
        setStep(old => old + 1);
    };

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            handleNextStep();
        }
    };

    const handleTutorial = value => {
        dispatch(setTutorial(value));
    };

    const stepOne = (
        <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">{tc("common:name")}</Label>
                <Input
                    id="name"
                    placeholder={tc("homepage:projectNamePlaceholder")}
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
                <Label>{tc("homepage:defaultLineColor")}</Label>
                <HexAlphaColorPicker
                    color="#fff"
                    onChange={handleProjectColor}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );

    const stepThree = (
        <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label>{tc("homepage:showTutorial")}</Label>

                <Switch
                    checked={tutorial}
                    onCheckedChange={handleTutorial}
                />
            </div>
        </div>
    );

    const stepFour = (
        <Stepper
            step={step}
            setStep={setStep}
        />
    );

    return (
        <HomepageCard
            title="homepage:createProject"
            description="homepage:projectSetupDescription"
        >
            <CardContent>
                {[stepOne, stepTwo, stepThree, stepFour][step - 1] || stepFour}
            </CardContent>
            {step >= 4 || (
                <CardFooter className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handlePreviousStep}
                        className={step <= 1 && "hidden"}
                    >
                        <ChevronLeftIcon className="w-4 h-4" />
                        {tc("common:previous")}
                    </Button>
                    <Button
                        className="ms-auto"
                        onClick={handleNextStep}
                    >
                        {tc("common:next")}
                        <ChevronRightIcon className="w-4 h-4" />
                    </Button>
                </CardFooter>
            )}
        </HomepageCard>
    );
};

export default NewProject;
