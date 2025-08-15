import { createSlice } from "@reduxjs/toolkit";
import LineModel from "@/Models/LineModel";
import { calculateDistanceInPx } from "@/lib/utils";

const calculateRatio = state => {
    const {
        absoluteFrom: { x: x1, y: y1 },
        absoluteTo: { x: x2, y: y2 },
    } = state.referenceLine;

    const imageElement = document.querySelector("img");
    if (!imageElement) return;

    const imageRect = imageElement.getBoundingClientRect();
    const imageWidthCm =
        state.calculated.referenceHeight * (imageRect.width / imageRect.height);

    const distanceInPx = calculateDistanceInPx(x1, y1, x2, y2);
    const distanceInCm = state.calculated.referenceHeight;
    state.calculated.pixelToCmRatio = distanceInPx / distanceInCm;
    state.calculated.pixelToCmRatioWidth = imageRect.width / imageWidthCm;
};

const calculateDistanceInCm = (state, { absoluteFrom, absoluteTo }) => {
    const { x: x1, y: y1 } = absoluteFrom;
    const { x: x2, y: y2 } = absoluteTo;

    const distanceInPx = calculateDistanceInPx(x1, y1, x2, y2);
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

const getAbsoluteMousePosition = state => {
    const imageElement = document.querySelector("img");
    if (!imageElement) return { x: state.mouse.x, y: state.mouse.y };

    const imageRect = imageElement.getBoundingClientRect();
    const absoluteX = state.mouse.x - imageRect.left;
    const absoluteY = state.mouse.y - imageRect.top;

    return { x: absoluteX, y: absoluteY };
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
    projectColor: "#000",
    tutorial: false,
    lines: [],
    referenceLine: null,
    bools: {
        isDrawing: false,
        dots: 0,
    },
    calculated: {
        referenceHeight: null, //TODO: change to null
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
    image: null, //TODO: change to null
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
            line.absoluteFrom = getAbsoluteMousePosition(state);
            line.to = null;
            state.referenceLine = line.toSerializable();
            state.lines.push(line.toSerializable());
        },
        setReferenceLineTo(state) {
            state.bools.dots = 0;
            const line = {
                ...state.referenceLine,
                to: getRelativeMousePosition(state),
                absoluteTo: getAbsoluteMousePosition(state),
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
            const image = state.image;
            Object.assign(state, initialState);
            state.image = image;
            LineModel.id = 0;
        },
        setSelectedLineId(state, action) {
            state.utils.selectedLineId = action.payload;
        },
        setLastLineFrom(state) {
            state.bools.dots = 1;
            const line = new LineModel(state.projectColor);
            line.from = getRelativeMousePosition(state);
            line.absoluteFrom = getAbsoluteMousePosition(state);
            line.to = null;
            state.lines.push(line.toSerializable());
        },
        setLastLineTo(state) {
            state.bools.dots = 0;
            const line = {
                ...state.lines.at(-1),
                to: getRelativeMousePosition(state),
                absoluteTo: getAbsoluteMousePosition(state),
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
            Object.assign(state, action.payload);
        },
        setViewPorts(state, action) {
            state.utils.viewPort = action.payload;
        },
        updateLineVertices(state, action) {
            const updatedLine = action.payload;
            const index = state.lines.findIndex(
                line => line.id === updatedLine.id
            );

            if (index !== -1) {
                state.lines[index] = {
                    ...state.lines[index],
                    from: updatedLine.from,
                    to: updatedLine.to,
                };

                // Se è la linea di riferimento, aggiorna anche quella e ricalcola tutte le linee
                if (updatedLine.id === 1) {
                    state.referenceLine = state.lines[index];
                    calculateRatio(state);

                    // Ricalcola le dimensioni di tutte le linee con il nuovo ratio
                    state.lines.forEach((line, i) => {
                        if (line.to && i !== index) {
                            line.size = calculateDistanceInCm(state, line);
                        }
                    });
                } else {
                    // Ricalcola solo la dimensione della linea modificata
                    state.lines[index].size = calculateDistanceInCm(
                        state,
                        state.lines[index]
                    );
                }
            }
        },
        setTutorial(state, action) {
            state.tutorial = action.payload;
        },
    },
});

export const {
    setProjectName,
    setProjectColor,
    setReferenceLineFrom,
    setReferenceLineTo,
    deleteLine,
    deleteAllLines,
    hideLine,
    showLine,
    setIsDrawing,
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
    updateLineVertices,
    setTutorial,
} = lineSlice.actions;
export default lineSlice.reducer;
