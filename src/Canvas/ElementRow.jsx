import React, { useEffect, useState } from "react";
import { MoreHorizontal, Move, Pencil, Trash2 } from "lucide-react";
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
        ...(line.id !== 1
            ? [
                  {
                      label: "Elimina",
                      action: () => {
                          dispatch(deleteLine(line.id));
                      },
                      icon: <Trash2 size={12} />,
                  },
              ]
            : []),
    ];

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                variant={
                    line.id === 1
                        ? "dashed"
                        : line.id === selectedLineId
                        ? "selected"
                        : "outline"
                }
                onClick={() => handleClick(line.id)}
                className="fade-in"
            >
                <div className="cursor-pointer text-white flex justify-between w-full items-center px-2 ">
                    <p>{lineName}</p>
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
                            className="flex justify-between gap-2 cursor-pointer"
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
