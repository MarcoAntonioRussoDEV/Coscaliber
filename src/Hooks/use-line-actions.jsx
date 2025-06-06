import { GradientPicker } from "@/components/ui/color-picker";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
    deleteLine,
    hideLine,
    setLineColor,
    setLineName,
    showLine,
} from "@/Redux/Redux-Slices/lineSlice";
import {
    Eye,
    EyeOff,
    Palette,
    PaletteIcon,
    Pencil,
    Trash2,
} from "lucide-react";
import { useRef, useState } from "react";
import { render } from "react-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

/**
 * Custom hook that generates a list of actions for a given line.
 *
 * @param {Object} line - The line object.
 * @param {boolean} line.isHidden - Indicates if the line is hidden.
 * @param {number} line.id - The unique identifier of the line.
 * @param {boolean} [line.isReferenceLine] - Indicates if the line is a reference line.
 * @returns {Array} An array of action objects for the line.
 *
 * Each action object contains:
 * @property {string} id - The unique identifier for the action.
 * @property {string} text - The translation key for the action.
 * @property {Function} action - The function to dispatch the action.
 * @property {React.Component} icon - The icon component for the action.
 */

export const useLineActions = (line, drawerRef, alertDialogRef) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const colorRef = useRef(null);

    let lineActions = [
        {
            id: "rename",
            text: "canvas:rename",
            action: () => {
                const newName = prompt(t("canvas:rename"));
                if (newName) {
                    const updatedLine = { id: line.id, name: newName };
                    dispatch(setLineName(updatedLine));
                }
            },
            icon: Pencil,
        },
        {
            id: "change-color",
            text: "canvas:changeColor",
            action: () => drawerRef.current.click(),
            icon: Palette,
        },
    ];

    if (line.isHidden) {
        lineActions.push({
            id: "show",
            text: "common:show",
            action: () => {
                dispatch(showLine(line));
            },
            icon: Eye,
        });
    } else {
        lineActions.push({
            id: "hide",
            text: "common:hide",
            action: () => {
                dispatch(hideLine(line));
            },
            icon: EyeOff,
        });
    }

    lineActions.push({
        id: "delete",
        text: "common:delete",
        action: () => {
            if (line.id === 1) {
                // Se è la linea di riferimento, apri l'AlertDialog
                alertDialogRef.current.click();
            } else {
                dispatch(deleteLine(line.id));
            }
        },
        icon: Trash2,
        shortcut: "Del",
    });

    return lineActions;
};

export default useLineActions;
