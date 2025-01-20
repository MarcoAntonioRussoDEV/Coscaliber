import React from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import { useDispatch } from "react-redux";
import { setLineColor } from "@/Redux/Redux-Slices/lineSlice";

const ColorDrawer = ({ color, id }) => {
    const dispatch = useDispatch();
    const handleColorChange = color => {
        dispatch(setLineColor({ id, color }));
    };

    return (
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle className="text-center">Pick a color</DrawerTitle>
                <DrawerDescription className="flex justify-center gap-2">
                    <HexAlphaColorPicker
                        color={color}
                        onChange={handleColorChange}
                    />
                </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
                <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    );
};

export default ColorDrawer;
