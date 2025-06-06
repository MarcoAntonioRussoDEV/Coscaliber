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
import { useTranslation } from "react-i18next";
import useTranslateCapitalize from "@/Hooks/use-translate-capitalize";

const HomepageCard = ({ children, title, description }) => {
    const tc = useTranslateCapitalize();

    return (
        <Animator className="relative">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>{tc(title)}</CardTitle>
                    <CardDescription>{tc(description)}</CardDescription>
                </CardHeader>
                {children}
            </Card>
        </Animator>
    );
};

export default HomepageCard;
