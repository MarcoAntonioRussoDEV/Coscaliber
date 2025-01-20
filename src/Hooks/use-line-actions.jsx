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
import { Eye, EyeOff, Palette, PaletteIcon, Pencil } from "lucide-react";
import { useRef, useState } from "react";
import { render } from "react-dom";
import { useDispatch } from "react-redux";

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
 * @property {string} label - The label of the action.
 * @property {Function} action - The function to dispatch the action.
 * @property {JSX.Element} icon - The icon representing the action.
 *
 * @If `line.isHidden` is true, the "Show" action is included.
 * @If `line.isHidden` is false, the "Hide" action is included.
 * @If `line.isReferenceLine` is false, the "Delete" action is included.
 */

export const useLineActions = (line, drawerRef) => {
    const dispatch = useDispatch();
    const colorRef = useRef(null);
    let lineActions = [
        {
            label: "Rename",
            action: () => {
                const newName = prompt("Enter the line name");
                if (newName) {
                    const updatedLine = { id: line.id, name: newName };
                    dispatch(setLineName(updatedLine));
                }
            },
            icon: <Pencil size={12} />,
        },
        {
            label: "Change color",
            action: () => drawerRef.current.click(),
            icon: <Palette size={12} />,
        },
    ];

    if (line.isHidden) {
        lineActions.push({
            label: "Show",
            action: () => {
                dispatch(showLine(line));
            },
            icon: <Eye size={12} />,
        });
    } else {
        lineActions.push({
            label: "Hide",
            action: () => {
                dispatch(hideLine(line));
            },
            icon: <EyeOff size={12} />,
        });
    }

    if (!line.isReferenceLine) {
        lineActions.push({
            label: "Delete",
            action: () => {
                dispatch(deleteLine(line));
            },
            icon: <EyeOff size={12} />,
        });
    }

    return lineActions;
};

export default useLineActions;
