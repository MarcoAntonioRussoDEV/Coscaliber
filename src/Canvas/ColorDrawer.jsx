import React from "react";
import {
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { HexAlphaColorPicker } from "react-colorful";
import { useDispatch } from "react-redux";
import { setLineColor } from "@/Redux/Redux-Slices/lineSlice";

const ColorDrawer = ({ color, id }) => {
    const dispatch = useDispatch();
    const handleColorChange = color => {
        dispatch(setLineColor({ id, color }));
    };

    return (
        <DrawerContent className="sm:max-w-[425px]">
            <DrawerHeader className="space-y-2">
                <DrawerTitle>Pick a color</DrawerTitle>
                <DrawerDescription>
                    <div className="flex justify-center gap-2">
                        <HexAlphaColorPicker
                            color={color}
                            onChange={handleColorChange}
                        />
                    </div>
                </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    );
};

export default ColorDrawer;
