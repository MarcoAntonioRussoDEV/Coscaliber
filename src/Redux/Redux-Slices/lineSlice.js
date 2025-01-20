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
    const { x: x1, y: y1 } = from;
    const { x: x2, y: y2 } = to;

    const distanceInPx = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const distanceInCm = state.calculated.pixelToCmRatio
        ? distanceInPx / state.calculated.pixelToCmRatio
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

const resetIsDrawing = state => {
    state.bools.isDrawing = false;
};

const initialState = {
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
    },
    image: null,
};

const lineSlice = createSlice({
    name: "lines",
    initialState,
    reducers: {
        /* ! ReferenceLine */
        setReferenceLineFrom(state) {
            state.bools.dots = 1;
            const line = new LineModel();
            line.from = getMousePosition(state);
            line.to = null;
            state.referenceLine = line;
        },
        setReferenceLineTo(state) {
            state.bools.dots = 0;
            const line = {
                ...state.referenceLine,
                to: getMousePosition(state),
            };

            state.referenceLine = line;
            state.referenceLine.size = state.calculated.referenceHeight;
            calculateRatio(state);
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
            const line = new LineModel();
            line.from = getMousePosition(state);
            line.to = null;
            state.lines.push(line);
        },
        setLastLineTo(state) {
            state.bools.dots = 0;
            const line = {
                ...state.lines.at(-1),
                to: getMousePosition(state),
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
                console.log(
                    "state.lines[index].name: ",
                    state.lines[index].name
                );
                state.lines[index].name = action.payload.name;
            }
        },
        /* ! ! Bools */
        setIsDrawing(state, action) {
            state.bools.isDrawing = action.payload;
        },
        setIsEdit(state, action) {
            /* TODO Edit */
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
} = lineSlice.actions;
export default lineSlice.reducer;
