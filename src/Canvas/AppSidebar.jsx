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
import useTranslateCapitalize from "@/Hooks/use-translate-capitalize";

const AppSidebar = () => {
    const dispatch = useDispatch();
    const tc = useTranslateCapitalize();
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
        let downlodable_json = { ...STATE_JSON, tutorial: false };
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
                <SidebarHeader className=" text-center">
                    {import.meta.env.VITE_APP_NAME}
                </SidebarHeader>
                <SidebarContent className="">
                    <SidebarGroup className="flex flex-col gap-4">
                        <Label className="flex flex-col gap-2">
                            <p className="text-start px-1 ">
                                {tc("canvas:reference_height")}{" "}
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
                                className="reference-height-step"
                            />
                        </Label>
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        disabled={!referenceHeight || !image}
                                        onClick={handleSetDrawing}
                                        className={`w-full ${
                                            !referenceHeight &&
                                            "cursor-not-allowed"
                                        }`}
                                    >
                                        {tc("canvas:add_mesurement")}
                                    </Button>
                                </TooltipTrigger>
                                {!referenceHeight && (
                                    <TooltipContent
                                        side="left"
                                        sideOffset={12}
                                        className="text-center bg-secondary text-secondary-foreground p-2 border shadow"
                                    >
                                        Aggiungi prima un'altezza di riferimento
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </SidebarGroup>
                    <Drawer>
                        <SidebarMenu>
                            <SidebarGroupLabel>
                                {tc("canvas:lines")}
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
                        <p className="p-1">{tc("canvas:upload_image")}</p>
                        <Input
                            type="file"
                            className="bg-background upload-image-step"
                            onChange={handleImageUpload}
                        />
                    </Label>
                    <Button
                        onClick={handleDownloadJson}
                        className="w-full"
                    >
                        {tc("canvas:download_project")}
                    </Button>
                    <AlertDialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-destructive hover:text-destructive-foreground h-10 px-4 py-2 w-full">
                        {tc("canvas:delete_all_lines")}
                    </AlertDialogTrigger>
                </SidebarFooter>
            </Sidebar>
            {/* ? MODAL */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {tc("canvas:alert_delete_all_lines")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {tc("canvas:disclamer_delete_all_lines")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{tc("common:cancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAllLines}>
                        {tc("common:delete")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AppSidebar;
