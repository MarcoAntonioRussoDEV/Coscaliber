import { createSlice } from "@reduxjs/toolkit";
import LineModel from "@/Models/LineModel";

const calculateRatio = state => {
    const {
        from: { x: x1, y: y1 },
        to: { x: x2, y: y2 },
    } = state.referenceLine;

    const distanceInPx = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const distanceInCm = state.calculated.referenceHeight;
    state.calculated.pixelToCmRatio = distanceInPx / distanceInCm;
};

const calculateDistanceInCm = (state, { from, to }) => {
    const imageElement = document.querySelector("img");
    if (!imageElement) return 0;

    const imageRect = imageElement.getBoundingClientRect();
    const x1 = (from.x * imageRect.width) / 100;
    const y1 = (from.y * imageRect.height) / 100;
    const x2 = (to.x * imageRect.width) / 100;
    const y2 = (to.y * imageRect.height) / 100;

    const distanceInPx = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const distanceInCm = state.calculated.pixelToCmRatio
        ? distanceInPx / state.calculated.pixelToCmRatio
        : 0;
    return distanceInCm.toFixed(2);
};

const getRelativeMousePosition = state => {
    const imageElement = document.querySelector("img");
    if (!imageElement) return { x: state.mouse.x, y: state.mouse.y };

    const imageRect = imageElement.getBoundingClientRect();
    const relativeX =
        ((state.mouse.x - imageRect.left) / imageRect.width) * 100;
    const relativeY =
        ((state.mouse.y - imageRect.top) / imageRect.height) * 100;

    return { x: relativeX, y: relativeY };
};

const calculateReferenceHeightOnEdit = state => {
    calculateRatio(state);
    state.lines.forEach(line => {
        line.size = calculateDistanceInCm(state, line);
    });
};

const resetIsDrawing = state => {
    state.bools.isDrawing = false;
};

const initialState = {
    projectName: "project",
    projectColor: "#fff",
    lines: [],
    referenceLine: null,
    bools: {
        isDrawing: false,
        isEdit: false,
        dots: 0,
    },
    calculated: {
        referenceHeight: 170, //TODO: change to null
        pixelToCmRatio: null,
    },
    mouse: {
        x: 0,
        y: 0,
    },
    utils: {
        selectedLineId: null,
        viewPort: {
            width: 0,
            height: 0,
        },
    },
    image: null,
};

const lineSlice = createSlice({
    name: "lines",
    initialState,
    reducers: {
        /* ! Project */
        setProjectName: (state, action) => {
            state.projectName = action.payload;
        },
        setProjectColor: (state, action) => {
            state.projectColor = action.payload;
        },
        /* ! ReferenceLine */
        setReferenceLineFrom(state) {
            state.bools.dots = 1;
            const line = new LineModel(state.projectColor);
            line.from = getRelativeMousePosition(state);
            line.to = null;
            state.referenceLine = line.toSerializable();
            state.lines.push(line.toSerializable());
        },
        setReferenceLineTo(state) {
            state.bools.dots = 0;
            const line = {
                ...state.referenceLine,
                to: getRelativeMousePosition(state),
            };

            state.referenceLine = line;
            state.referenceLine.size = state.calculated.referenceHeight;
            calculateRatio(state);

            state.lines.pop();
            state.lines.push(line);
            resetIsDrawing(state);
        },
        /* ! Lines */
        deleteLine(state, action) {
            state.lines = state.lines.filter(
                line => line.id !== action.payload
            );
        },
        deleteAllLines(state) {
            Object.assign(state, initialState);
            LineModel.id = 0;
        },
        setSelectedLineId(state, action) {
            state.utils.selectedLineId = action.payload;
        },
        setLastLineFrom(state) {
            state.bools.dots = 1;
            const line = new LineModel(state.projectColor);
            line.from = getRelativeMousePosition(state);
            line.to = null;
            state.lines.push(line.toSerializable());
        },
        setLastLineTo(state) {
            state.bools.dots = 0;
            const line = {
                ...state.lines.at(-1),
                to: getRelativeMousePosition(state),
            };
            line.size = calculateDistanceInCm(state, line);
            state.lines.pop();
            state.lines.push(line);

            resetIsDrawing(state);
        },
        hideLine(state, action) {
            const index = state.lines.findIndex(
                line => line.id === action.payload.id
            );
            if (index !== -1) {
                state.lines[index].isHidden = true;
            }
        },
        showLine(state, action) {
            const index = state.lines.findIndex(
                line => line.id === action.payload.id
            );
            if (index !== -1) {
                state.lines[index].isHidden = false;
            }
        },
        setLineColor(state, action) {
            const index = state.lines.findIndex(
                line => line.id === action.payload.id
            );
            if (index !== -1) {
                state.lines[index].color = action.payload.color;
            }
        },
        setLineName(state, action) {
            const index = state.lines.findIndex(
                line => line.id === action.payload.id
            );
            if (index !== -1) {
                state.lines[index].name = action.payload.name;
            }
        },
        /* ! ! Bools */
        setIsDrawing(state, action) {
            state.bools.isDrawing = action.payload;
        },
        setIsEdit(state, action) {
            state.bools.isEdit = action.payload;
        },
        /* ! Constants */
        setReferenceHeight(state, action) {
            state.calculated.referenceHeight = action.payload;
            if (state.referenceLine) {
                state.referenceLine.size = state.calculated.referenceHeight;
                calculateReferenceHeightOnEdit(state);
            }
        },
        /* ! Dots */
        setDots(state, action) {
            state.bools.dots = action.payload;
        },
        /* ! Mouse */
        setMouseX(state, action) {
            state.mouse.x = action.payload;
        },
        setMouseY(state, action) {
            state.mouse.y = action.payload;
        },
        setMousePosition(state, action) {
            state.mouse = action.payload;
        },
        /* ! Image */
        setImage(state, action) {
            state.image = action.payload;
        },
        /* ! Utils */
        setState(state, action) {
            console.log("action.payload: ", action.payload);
            Object.assign(state, action.payload);
        },
        setViewPorts(state, action) {
            state.utils.viewPort = action.payload;
        },
    },
});

export const {
    setProjectName,
    setProjectColor,
    setCanvas,
    setReferenceLine,
    setReferenceLineFrom,
    setReferenceLineTo,
    addNewLine,
    deleteLine,
    deleteAllLines,
    hideLine,
    showLine,
    setIsDrawing,
    setIsEdit,
    setReferenceHeight,
    setDots,
    setMouseX,
    setMouseY,
    setMousePosition,
    setSelectedLineId,
    setLastLineFrom,
    setLastLineTo,
    setImage,
    setLineColor,
    setLineName,
    setState,
    setViewPorts,
} = lineSlice.actions;
export default lineSlice.reducer;
