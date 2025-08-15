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
import { useTranslation } from "react-i18next";

const ColorDrawer = ({ color, id }) => {
    const dispatch = useDispatch();
    const handleColorChange = color => {
        dispatch(setLineColor({ id, color }));
    };
    const { t } = useTranslation();

    return (
        <DrawerContent>
            <DrawerHeader className="space-y-2">
                <DrawerTitle className="text-center">
                    {t("canvas:changeColor")}
                </DrawerTitle>
                <DrawerDescription className="text-center text-sm text-muted-foreground hidden">
                    Select a color for your line
                </DrawerDescription>
            </DrawerHeader>
            <div className="flex justify-center gap-2 px-6 pb-4">
                <HexAlphaColorPicker
                    color={color}
                    onChange={handleColorChange}
                />
            </div>
            <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                    <div className="flex justify-center">
                        <Button
                            variant="outline"
                            className="w-fit"
                        >
                            {t("common:cancel")}
                        </Button>
                    </div>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    );
};

export default ColorDrawer;
