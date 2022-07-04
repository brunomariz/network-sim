// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../store";

// // Define a type for the slice state
// interface CursorState {
//   selectedFeature: boolean;
// }

// // Define the initial state using that type
// const initialState: CursorState = {
//   selectedFeature: false,
// };

// export const simulationSlice = createSlice({
//   name: "simulation",
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {
//     start: (state) => {
//       state.running = true;
//     },
//     stop: (state) => {
//       state.running = false;
//     },
//     // Use the PayloadAction type to declare the contents of `action.payload`
//     // incrementByAmount: (state, action: PayloadAction<number>) => {
//     //   state.value += action.payload;
//     // },
//   },
// });

// export const { start, stop } = simulationSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectRunning = (state: RootState) => state.simulation.running;

// export default simulationSlice.reducer;
