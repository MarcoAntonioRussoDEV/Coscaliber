import React, { useEffect, useState } from "react";
import {
    Eye,
    EyeOff,
    MoreHorizontal,
    Move,
    Pencil,
    Trash2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteLine, setSelectedLineId } from "@redux/lineSlice.js";
import { hideLine, showLine } from "@/Redux/Redux-Slices/lineSlicePREV";

const ElementRow = ({ line }) => {
    const [lineName, setLineName] = useState();
    const dispatch = useDispatch();
    const { selectedLineId } = useSelector(state => state.lines);

    useEffect(() => {
        setLineName(line.name);
    }, []);

    const handleClick = lineID => {
        if (selectedLineId === lineID) {
            dispatch(setSelectedLineId(null));
        } else {
            dispatch(setSelectedLineId(lineID));
        }
    };
    const dropDownActions = [
        {
            label: "Rinomina",
            action: () => {
                const newName = prompt("Inserisci il nome della linea");
                if (newName) {
                    setLineName(newName);
                }
            },
            icon: <Pencil size={12} />,
        },
        ...(line.isHidden
            ? [
                  {
                      label: "Mostra",
                      action: () => {
                          dispatch(showLine(line.id));
                      },
                      icon: <Eye size={12} />,
                  },
              ]
            : [
                  {
                      label: "Nascondi",
                      action: () => {
                          dispatch(hideLine(line.id));
                      },
                      icon: <EyeOff size={12} />,
                  },
              ]),

        ...(line.id !== 1
            ? [
                  {
                      label: "Elimina",
                      action: () => {
                          dispatch(deleteLine(line.id));
                      },
                      icon: <Trash2 size={12} />,
                      className: "hover:bg-red-800",
                  },
              ]
            : []),
    ];

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                variant={
                    line.id === 1
                        ? "striped"
                        : line.id === selectedLineId
                        ? "selected"
                        : "outline"
                }
                onClick={() => handleClick(line.id)}
                className={`fade-in ${line.isHidden ? "opacity-35" : ""}`}
            >
                <div className="cursor-pointer text-white flex justify-between w-full items-center px-2 ">
                    <p className="truncate whitespace-nowrap text-xs">
                        {lineName} -{" "}
                        <span className="italic text-muted-foreground">
                            {line.size} cm
                        </span>
                    </p>
                </div>
            </SidebarMenuButton>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction>
                        <MoreHorizontal />
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="right"
                    align="start"
                >
                    {dropDownActions.map(action => (
                        <DropdownMenuItem
                            key={action.label}
                            onClick={action.action}
                            className={`flex justify-between gap-2 cursor-pointer ${action.className}`}
                        >
                            <span>{action.label}</span>
                            {action.icon}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
};

export default ElementRow;
