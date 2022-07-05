import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Air } from "../../../@types/networkFeatures/air";
import { NetworkFeature } from "../../../@types/networkFeatures/networkFeature";
import { Position } from "../../../@types/utils/position";
import { Signal } from "../../../@types/utils/singal";
import type { RootState } from "../../store";

// Define a type for the slice state
interface SimulationState {
  running: boolean;
  grid: NetworkFeature[][];
}

// Define the initial state using that type
const initialState: SimulationState = {
  running: false,
  grid: new Array(3).fill(
    new Array(3).fill({ featureName: "Air", signals: [{} as Signal] } as Air)
  ),
};

export const simulationSlice = createSlice({
  name: "simulation",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    start: (state) => {
      state.running = true;
    },
    stop: (state) => {
      state.running = false;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    elementChanged: (
      state,
      action: PayloadAction<{
        networkFeature: NetworkFeature;
        position: { row: number; column: number };
      }>
    ) => {
      const { row, column } = action.payload.position;
      const element = action.payload.networkFeature;
      state.grid[row][column] = element;
    },
    elementTransmitting: (state, action: PayloadAction<Position>) => {
      const { row, column } = action.payload;
      state.grid[row][column].transmitting = true;
    },
    elementNotTransmitting: (state, action: PayloadAction<Position>) => {
      const { row, column } = action.payload;
      state.grid[row][column].transmitting = false;
    },
  },
});

export const {
  start,
  stop,
  elementChanged,
  elementNotTransmitting,
  elementTransmitting,
} = simulationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectRunning = (state: RootState) => state.simulation.running;
export const selectGrid = (state: RootState) => state.simulation.grid;

export default simulationSlice.reducer;
