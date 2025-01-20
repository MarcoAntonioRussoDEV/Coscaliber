import React, { useEffect } from "react";
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

const AppSidebar = () => {
    const dispatch = useDispatch();
    const {
        calculated: { referenceHeight },
        lines,
        referenceLine,
        projectName,
    } = useSelector(state => state.lines);
    const STATE_JSON = useSelector(state => state.lines);

    const handleSetDrawing = () => {
        dispatch(setIsDrawing(true));
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
            <Sidebar
                side="right"
                variant="floating"
            >
                <SidebarHeader className=" text-center">
                    Cosplay Calculator
                </SidebarHeader>
                <SidebarContent className="">
                    <SidebarGroup className="flex flex-col gap-4">
                        <Label className="flex flex-col gap-2">
                            <p className="text-start px-1">
                                Altezza di riferimento
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
                                        disabled={!referenceHeight}
                                        onClick={handleSetDrawing}
                                        className={`w-full ${
                                            !referenceHeight &&
                                            "cursor-not-allowed"
                                        }`}
                                    >
                                        Aggiungi misurazione
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
                            <SidebarGroupLabel>Linee</SidebarGroupLabel>
                            <SidebarGroup className="flex flex-col gap-1">
                                {lines.map(line => (
                                    <ElementRow
                                        key={line.id}
                                        line={line}
                                    />
                                ))}
                            </SidebarGroup>
                        </SidebarMenu>
                    </Drawer>
                </SidebarContent>
                <SidebarFooter>
                    <Label>
                        <p className="p-1">Carica Immagine</p>
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
                        Scarica JSON
                    </Button>
                    <AlertDialogTrigger asChild>
                        <SidebarMenuButton variant="destructive">
                            <p className="text-center w-full">
                                Cancella tutte le linee
                            </p>
                        </SidebarMenuButton>
                    </AlertDialogTrigger>
                </SidebarFooter>
            </Sidebar>
            {/* //? MODAL */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Sei sicuro di voler cancellare tutte le linee?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Questa azione non può essere annullata, tutte le linee
                        verranno cancellate.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annulla</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAllLines}>
                        Conferma
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AppSidebar;
