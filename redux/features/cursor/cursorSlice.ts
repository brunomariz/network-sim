import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Air } from "../../../@types/networkFeatures/air";
import { NetworkFeature } from "../../../@types/networkFeatures/networkFeature";
import { getAir } from "../../../model/networkFeatures/air/getAir";
import type { RootState } from "../../store";

// Define a type for the slice state
interface CursorState {
  selectedFeature: NetworkFeature;
}

// Define the initial state using that type
const initialState: CursorState = {
  selectedFeature: getAir(),
};

export const cursorSlice = createSlice({
  name: "cursor",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectedFeatureChanged: (state, action: PayloadAction<NetworkFeature>) => {
      state.selectedFeature = action.payload;
    },
    // stop: (state) => {
    //   state.running = false;
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { selectedFeatureChanged } = cursorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSelectedFeature = (state: RootState) =>
  state.cursor.selectedFeature;

export default cursorSlice.reducer;
