"use client";

import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Paintbrush } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Input } from "./input";

export function PickerExample() {
    const [background, setBackground] = useState("#B4D455");

    return (
        <div
            style={{ background }}
            className="flex min-h-[350px] justify-center p-10 items-center rounded transition-all"
        >
            <GradientPicker
                background={background}
                setBackground={setBackground}
            />
        </div>
    );
}

export function GradientPicker({ background, setBackground }) {
    const solids = [
        "#E2E2E2",
        "#ff75c3",
        "#ffa647",
        "#ffe83f",
        "#9fff5b",
        "#70e2ff",
        "#cd93ff",
        "#09203f",
    ];

    const gradients = [
        "linear-gradient(to top left,#accbee,#e7f0fd)",
        "linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)",
        "linear-gradient(to top left,#000000,#434343)",
        "linear-gradient(to top left,#09203f,#537895)",
        "linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)",
        "linear-gradient(to top left,#f953c6,#b91d73)",
        "linear-gradient(to top left,#ee0979,#ff6a00)",
        "linear-gradient(to top left,#F00000,#DC281E)",
        "linear-gradient(to top left,#00c6ff,#0072ff)",
        "linear-gradient(to top left,#4facfe,#00f2fe)",
        "linear-gradient(to top left,#0ba360,#3cba92)",
        "linear-gradient(to top left,#FDFC47,#24FE41)",
        "linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)",
        "linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)",
        "linear-gradient(to top left,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)",
        "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
    ];

    const images = [
        "url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
        "url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90",
        "url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
        "url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
    ];

    const defaultTab = useMemo(() => {
        if (background.includes("url")) return "image";
        if (background.includes("gradient")) return "gradient";
        return "solid";
    }, [background]);

    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    auto
                    bordered
                >
                    <div className="flex gap-2">
                        {background ? (
                            <div
                                className="h-4 w-4 rounded"
                                style={{ background }}
                            ></div>
                        ) : (
                            <Paintbrush className="h-4 w-4" />
                        )}
                        <div className="truncate">
                            {background ? background : "Pick a color"}
                        </div>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent aria-expanded="true">
                <Tabs
                    defaultValue={defaultTab}
                    className="flex flex-col gap-4"
                >
                    <TabsList className="w-fit mx-a">
                        <TabsTrigger value="solid">Solid</TabsTrigger>
                        <TabsTrigger value="gradient">Gradient</TabsTrigger>
                        {/* <TabsTrigger value="image">Image</TabsTrigger> */}
                    </TabsList>

                    <TabsContent
                        value="solid"
                        className="grid grid-cols-4 gap-2 gap-y-4 place-items-center"
                    >
                        {solids.map(s => (
                            <div
                                key={s}
                                style={{ background: s }}
                                className="rounded-md h-6 w-6 cursor-pointer"
                                onClick={() => setBackground(s)}
                            />
                        ))}
                    </TabsContent>

                    <TabsContent
                        value="gradient"
                        className="grid grid-cols-4 gap-2 place-items-center"
                    >
                        {gradients.map(s => (
                            <div
                                key={s}
                                style={{ background: s }}
                                className="rounded-md h-6 w-6 cursor-pointer"
                                onClick={() => setBackground(s)}
                            />
                        ))}
                    </TabsContent>

                    {/* <TabsContent
                        value="image"
                        className="grid grid-cols-4 gap-2 place-items-center"
                    >
                        {images.map(s => (
                            <div
                                key={s}
                                style={{ backgroundImage: s }}
                                className="rounded-md bg-cover bg-center h-12 w-full cursor-pointer"
                                onClick={() => setBackground(s)}
                            />
                        ))}
                    </TabsContent> */}
                </Tabs>

                <Input
                    value={background}
                    onChange={e => setBackground(e.currentTarget.value)}
                    className="mt-6"
                />
            </PopoverContent>
        </Popover>
    );
}

const GradientButton = ({ background, children }) => {
    return (
        <div
            className="p-0.5 rounded-md"
            style={{ background }}
        >
            <div className="bg-popover/80 rounded-md p-1 text-xs text-center">
                {children}
            </div>
        </div>
    );
};
