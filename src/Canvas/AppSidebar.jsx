import React from "react";
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
import { deleteAllLines } from "@/Redux/Redux-Slices/lineSlicePREV";

const AppSidebar = () => {
    const dispatch = useDispatch();
    const { referenceHeight, lines, referenceLine } = useSelector(
        state => state.lines
    );

    const handleSetDrawing = () => {
        dispatch(setIsDrawing(true));
    };

    const handleHeightChange = e => {
        dispatch(setReferenceHeight(parseFloat(e.target.value)));
    };

    const handleDeleteAllLines = () => {
        dispatch(deleteAllLines());
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
                                value={referenceHeight}
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
                                    >
                                        <p className="bg-accent p-2 rounded-lg border text-sm italic">
                                            Aggiungi prima un'altezza di
                                            riferimento
                                        </p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </SidebarGroup>
                    <SidebarMenu>
                        <SidebarGroupLabel>Linee</SidebarGroupLabel>
                        <SidebarGroup className="flex flex-col gap-1">
                            {referenceLine && (
                                <ElementRow
                                    key={referenceLine.id}
                                    line={referenceLine}
                                />
                            )}
                            {lines.map(line => (
                                <ElementRow
                                    key={line.id}
                                    line={line}
                                />
                            ))}
                        </SidebarGroup>
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                    <AlertDialogTrigger asChild>
                        <SidebarMenuButton variant="destructive">
                            <p className="text-center w-full">
                                Cancella tutte le linee
                            </p>
                        </SidebarMenuButton>
                    </AlertDialogTrigger>
                </SidebarFooter>
            </Sidebar>

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
