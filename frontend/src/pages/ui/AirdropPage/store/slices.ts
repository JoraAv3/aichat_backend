// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FarmingStatus } from "./types";

export interface AirDropState {
  currentTotalCoinsFarmed?: number;
  status: FarmingStatus;
  isFarming: boolean;
  progress: number;
  remainingTime: number;
}

const initialState: AirDropState = {
  status: FarmingStatus.START_MINING,
  isFarming: false,
  progress: 0,
  remainingTime: 0,
};

const airDropSlice = createSlice({
  name: "airdrop",
  initialState,
  reducers: {
    setCurrentTotalCoinsFarmed(state, action: PayloadAction<number>) {
      state.currentTotalCoinsFarmed = action.payload;
    },
    setFarmingState(state, action: PayloadAction<Partial<AirDropState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCurrentTotalCoinsFarmed, setFarmingState } =
  airDropSlice.actions;
export default airDropSlice.reducer;
