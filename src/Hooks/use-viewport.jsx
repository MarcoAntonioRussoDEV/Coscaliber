import { setViewPorts } from "@/Redux/Redux-Slices/lineSlice";
import { useWindowSize } from "@react-hook/window-size";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useViewPort = () => {
    const [width, height] = useWindowSize({ wait: 0 });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setViewPorts({ width, height }));
    }, [width, height]);

    return { VW: width, VH: height };
};
