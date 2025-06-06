import React, { useEffect, useRef } from "react";
import ElementRow from "./ElementRow";
import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setIsDrawing, setReferenceHeight } from "@redux/lineSlice.js";
import {
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import { deleteAllLines, setImage } from "@/Redux/Redux-Slices/lineSlice";
import { Drawer } from "@/components/ui/drawer";
import { useTranslation } from "react-i18next";

const AppSidebar = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        calculated: { referenceHeight, pixelToCmRatio },
        lines,
        referenceLine,
        projectName,
        image,
    } = useSelector(state => state.lines);
    const STATE_JSON = useSelector(state => state.lines);
    const alertDialogRef = useRef(null);
    const { isMobile, setOpenMobile } = useSidebar();
    const handleSetDrawing = () => {
        if (image) {
            dispatch(setIsDrawing(true));
            if (isMobile) {
                setOpenMobile(false);
            }
        }
    };

    const handleHeightChange = e => {
        dispatch(setReferenceHeight(parseFloat(e.target.value)));
    };

    const handleDeleteAllLines = () => {
        dispatch(deleteAllLines());
    };

    const handleDownloadJson = () => {
        let downlodable_json = { ...STATE_JSON };
        delete downlodable_json.mouse;
        delete downlodable_json.bools;
        delete downlodable_json.utils;
        const dataStr = JSON.stringify(downlodable_json, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${projectName}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImageUpload = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                dispatch(setImage(reader.result));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                ref={alertDialogRef}
                className="hidden"
            />
            <Sidebar
                side="right"
                variant="floating"
            >
                <SidebarHeader className=" text-center uppercase font-bold">
                    {import.meta.env.VITE_APP_NAME}
                </SidebarHeader>
                <SidebarContent className="">
                    <SidebarGroup className="flex flex-col gap-4">
                        <Label className="flex flex-col gap-2">
                            <p className="text-start px-1">
                                {t("canvas:referenceHeight")}
                            </p>
                            <Input
                                type="number"
                                placeholder="cm"
                                variant="secondary"
                                onChange={handleHeightChange}
                                value={
                                    referenceHeight != null
                                        ? referenceHeight
                                        : ""
                                }
                            />
                        </Label>
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger className="cursor-not-allowed">
                                    <Button
                                        disabled={!referenceHeight || !image}
                                        onClick={handleSetDrawing}
                                        className={`w-full ${
                                            !referenceHeight &&
                                            "cursor-not-allowed"
                                        }`}
                                    >
                                        {t("canvas:addMeasurement")}
                                    </Button>
                                </TooltipTrigger>
                                {!referenceHeight && (
                                    <TooltipContent
                                        side="left"
                                        sideOffset={12}
                                        className="text-center bg-secondary text-secondary-foreground p-2 border shadow"
                                    >
                                        {t("canvas:addReferenceHeightFirst")}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </SidebarGroup>
                    <Drawer>
                        <SidebarMenu>
                            <SidebarGroupLabel>
                                {t("canvas:lines")}
                            </SidebarGroupLabel>
                            <SidebarGroup className="flex flex-col gap-1">
                                {lines.map(line => (
                                    <ElementRow
                                        key={line.id}
                                        line={line}
                                        alertDialogRef={alertDialogRef}
                                    />
                                ))}
                            </SidebarGroup>
                        </SidebarMenu>
                    </Drawer>
                </SidebarContent>
                <SidebarFooter>
                    <Label>
                        <p className="p-1">{t("canvas:loadImage")}</p>
                        <Input
                            type="file"
                            className="bg-background"
                            onChange={handleImageUpload}
                        />
                    </Label>
                    <Button
                        onClick={handleDownloadJson}
                        className="w-full"
                    >
                        {t("canvas:downloadJSON")}
                    </Button>
                    <AlertDialogTrigger asChild>
                        <SidebarMenuButton variant="destructive">
                            <p className="text-center w-full">
                                {t("canvas:deleteAllLines")}
                            </p>
                        </SidebarMenuButton>
                    </AlertDialogTrigger>
                </SidebarFooter>
            </Sidebar>
            {/* ? MODAL */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {t("canvas:deleteAllConfirmTitle")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {t("canvas:deleteAllConfirmDescription")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="capitalize">
                        {t("common:cancel")}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="capitalize"
                        onClick={handleDeleteAllLines}
                    >
                        {t("common:confirm")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AppSidebar;
