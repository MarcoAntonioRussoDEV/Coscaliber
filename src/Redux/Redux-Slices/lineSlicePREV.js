import { createSlice } from "@reduxjs/toolkit";
import LineModel from "@/Models/LineModel";

const calculateRatio = state => {
    const {
        from: { x: x1, y: y1 },
        to: { x: x2, y: y2 },
    } = state.referenceLine;

    const distanceInPx = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const distanceInCm = state.referenceHeight;
    state.pixelToCmRatio = distanceInPx / distanceInCm;
};

const calculateDistanceInCm = (state, { from, to }) => {
    const { x: x1, y: y1 } = from;
    const { x: x2, y: y2 } = to;

    const distanceInPx = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const distanceInCm = state.pixelToCmRatio
        ? distanceInPx / state.pixelToCmRatio
        : 0;
    return distanceInCm.toFixed(2);
};

const getMousePosition = state => {
    return { x: state.mouse.x, y: state.mouse.y };
};

const calculateReferenceHeightOnEdit = state => {
    calculateRatio(state);
    state.lines.forEach(line => {
        line.size = calculateDistanceInCm(state, line);
    });
};

const initialState = {
    lines: [],
    referenceLine: null,
    isDrawing: false,
    isEdit: false,
    referenceHeight: 170, //TODO: change to null
    dots: 0,
    pixelToCmRatio: null,
    selectedLineId: null,
    mouse: {
        x: 0,
        y: 0,
    },
};

const lineSlice = createSlice({
    name: "lines",
    initialState,
    reducers: {
        /* ReferenceLine */
        setReferenceLineFrom(state) {
            state.dots = 1;
            const line = new LineModel();
            line.from = getMousePosition(state);
            line.to = null;
            state.referenceLine = line;
        },
        setReferenceLineTo(state) {
            state.dots = 0;
            const line = {
                ...state.referenceLine,
                to: getMousePosition(state),
            };
            state.referenceLine = line;
            state.referenceLine.size = state.referenceHeight;
            calculateRatio(state);
        },
        /* Lines */
        deleteLine(state, action) {
            state.lines = state.lines.filter(
                line => line.id !== action.payload
            );
        },
        deleteAllLines(state) {
            state.lines = [];
            state.referenceLine = null;
            LineModel.id = 0;
        },
        setSelectedLineId(state, action) {
            state.selectedLineId = action.payload;
        },
        setLastLineFrom(state) {
            state.dots = 1;
            const line = new LineModel();
            line.from = getMousePosition(state);
            line.to = null;
            state.lines.push(line);
        },
        setLastLineTo(state) {
            state.dots = 0;
            const line = {
                ...state.lines.at(-1),
                to: getMousePosition(state),
            };
            line.size = calculateDistanceInCm(state, line);
            state.lines.pop();
            state.lines.push(line);
        },
        /* Bools */
        setIsDrawing(state, action) {
            state.isDrawing = action.payload;
        },
        setIsEdit(state, action) {
            state.isEdit = action.payload;
        },
        /* Constants */
        setReferenceHeight(state, action) {
            state.referenceHeight = action.payload;
            state.referenceLine.size = state.referenceHeight;
            calculateReferenceHeightOnEdit(state);
        },
        /* Dots */
        setDots(state, action) {
            state.dots = action.payload;
        },
        /* Mouse */
        setMouseX(state, action) {
            state.mouse.x = action.payload;
        },
        setMouseY(state, action) {
            state.mouse.y = action.payload;
        },
        setMousePosition(state, action) {
            state.mouse = action.payload;
        },
    },
});

export const {
    setCanvas,
    setReferenceLine,
    setReferenceLineFrom,
    setReferenceLineTo,
    addNewLine,
    deleteLine,
    deleteAllLines,
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
} = lineSlice.actions;
export default lineSlice.reducer;
