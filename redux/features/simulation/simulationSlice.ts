import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Air } from "../../../@types/networkFeatures/air";
import { NetworkFeature } from "../../../@types/networkFeatures/networkFeature";
import { Signal } from "../../../@types/utils/signal";
import {
  ITickFunction,
  ITickFunctionParams,
} from "../../../@types/utils/tickFunctionInterface";
import Grid from "../../../components/Grid/Grid";
import { getAir } from "../../../model/networkFeatures/air/getAir";
import { tickNode } from "../../../model/networkFeatures/node/tickNode";
import { tickTwistedPair } from "../../../model/networkFeatures/twistedPair/tickTwistedPair";
import { generateTemplate } from "../../../model/utils/templates/generateTemplate";
import type { RootState } from "../../store";

// Define a type for the slice state
interface SimulationState {
  running: boolean;
  grid: NetworkFeature[][];
}

const initialRows = 10;
const initialColumns = 15;

// Define the initial state using that type
const initialState: SimulationState = {
  running: false,
  grid: new Array(initialRows).fill(new Array(initialColumns).fill(getAir())),
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
    // elementTransmitting: (state, action: PayloadAction<Position>) => {
    //   const { row, column } = action.payload;
    //   state.grid[row][column].transmitting = true;
    // },
    // elementNotTransmitting: (state, action: PayloadAction<Position>) => {
    //   const { row, column } = action.payload;
    //   state.grid[row][column].transmitting = false;
    // },
    resetElements: (
      state,
      action: PayloadAction<"icon" | "stripes" | "initial">
    ) => {
      state.grid = new Array(initialRows).fill(
        new Array(initialColumns).fill(getAir())
      );
      if (action.payload == "initial") {
        state.grid = initialState.grid;
      } else {
        state.grid = generateTemplate(state.grid, action.payload);
      }
    },
    clearElements: (state) => {
      state.grid = new Array(initialRows).fill(
        new Array(initialColumns).fill(getAir())
      );
    },

    tick: (state) => {
      const auxGrid = [
        ...state.grid.map((row) => {
          return [...row];
        }),
      ];

      for (let row = 0; row < state.grid.length; row++) {
        for (let column = 0; column < state.grid[0].length; column++) {
          switch (state.grid[row][column].featureName) {
            case "TwistedPair":
              auxGrid[row][column] = tickTwistedPair({
                elements: current(state.grid),
                position: {
                  row,
                  column,
                },
              });
              break;

            case "Node":
              auxGrid[row][column] = tickNode({
                elements: current(state.grid),
                position: {
                  row,
                  column,
                },
              });

            default:
              break;
          }
        }
      }
      state.grid = auxGrid;
    },
    rowsChanged: (state, action: PayloadAction<number>) => {
      const rows = action.payload;
      const stateRows = state.grid.length;
      const stateColumns = state.grid[0].length;
      // If rows got bigger
      if (rows > stateRows) {
        // Add rows
        for (let index = 0; index < rows - stateRows; index++) {
          state.grid.push(new Array(stateColumns).fill(getAir()));
        }
        new Array(initialRows).fill(getAir());
      }
      // If rows got smaller
      else {
        // Remove rows
        state.grid = state.grid.slice(0, rows);
      }
    },
  },
});

export const {
  start,
  stop,
  elementChanged,
  // elementNotTransmitting,
  // elementTransmitting,
  resetElements,
  clearElements,
  tick,
  rowsChanged,
} = simulationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectRunning = (state: RootState) => state.simulation.running;
export const selectGrid = (state: RootState) => state.simulation.grid;

export default simulationSlice.reducer;
