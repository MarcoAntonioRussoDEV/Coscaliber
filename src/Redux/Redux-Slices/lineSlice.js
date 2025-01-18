import { createSlice } from '@reduxjs/toolkit';

const calculateRatio = (state) => {
  const { pointPairs } = state;
  const referenceLine = pointPairs[0];

  const distanceInPx = Math.sqrt(
    Math.pow(referenceLine[1].x - referenceLine[0].x, 2) +
      Math.pow(referenceLine[1].y - referenceLine[0].y, 2),
  );
  const distanceInCm = state.referenceHeight;
  state.pixelToCmRatio = distanceInPx / distanceInCm;
};

const calculateDistanceInCm = (state, from, to) => {
  const { x: x1, y: y1 } = from;
  const { x: x2, y: y2 } = to;

  const distanceInPx = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const distanceInCm = state.pixelToCmRatio
    ? distanceInPx / state.pixelToCmRatio
    : 0;
  return distanceInCm.toFixed(2);
};

const createNewLine = (state) => {
  const lastPair = state.pointPairs[state.pointPairs.length - 1];
  const from = lastPair[0];
  const to = lastPair[1];
  return {
    id: `line-${state.lines.length}`,
    from,
    to,
    distance: calculateDistanceInCm(state, from, to),
  };
};

const initialState = {
  canvas: null,
  lines: [],
  isDrawing: false,
  referenceHeight: 170, //TODO: change to null
  elements: [],
  dots: 0,
  pointPairs: [],
  pixelToCmRatio: null,
  selectedLineId: null,
  mouse: {
    x: 0,
    y: 0,
  },
};

const lineSlice = createSlice({
  name: 'lines',
  initialState,
  reducers: {
    /* Canvas */
    setCanvas(state, action) {
      state.canvas = action.payload;
    },
    /* Lines */
    addNewLine(state) {
      const newLine = createNewLine(state);
      state.lines.push(newLine);
    },
    deleteLine(state, action) {
      state.lines = state.lines.filter((line) => line.id !== action.payload);
    },
    setSelectedLineId(state, action) {
      state.selectedLineId = action.payload;
    },
    /* Bools */
    setIsDrawing(state, action) {
      state.isDrawing = action.payload;
    },
    /* Constants */
    setReferenceHeight(state, action) {
      state.referenceHeight = action.payload;
    },
    /* Elements */
    setElements(state, action) {
      state.elements = action.payload;
    },
    addElement(state, action) {
      state.elements.push(action.payload);
    },
    /* Dots */
    setDots(state, action) {
      state.dots = action.payload;
    },
    setPointPairs(state, action) {
      state.pointPairs = action.payload;
    },
    addPointsPair(state, action) {
      state.pointPairs.push(action.payload);
    },
    setLastPointsPair(state, action) {
      state.pointPairs[state.pointPairs.length - 1] = action.payload;
    },
    addLastPointToLastPair(state, action) {
      state.pointPairs[state.pointPairs.length - 1].push(action.payload);
      if (state.pointPairs.length === 1) {
        calculateRatio(state);
      }
      state.isDrawing = false;
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
  addNewLine,
  deleteLine,
  setIsDrawing,
  setReferenceHeight,
  setElements,
  addElement,
  setDots,
  setPointPairs,
  addPointsPair,
  setMouseX,
  setMouseY,
  setMousePosition,
  setLastPointsPair,
  addLastPointToLastPair,
  setSelectedLineId,
} = lineSlice.actions;
export default lineSlice.reducer;
