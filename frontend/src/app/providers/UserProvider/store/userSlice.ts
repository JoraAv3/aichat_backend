// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FarmingData } from "./types";

export interface Wallet {
  coins: number;
}

export interface UserState {
  initDataRaw?: string;
  wallet?: Wallet;
  farmingData: FarmingData;
}

const initialState: UserState = {
  farmingData: {
    timePassed: 0,
    needToClaim: false,
    taskRewardAmount: 0,
    currentFarmReward: 0,
    plusEverySecond: 0,
    totalDuration: 0,
    totalFarmReward: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInitDataRaw(state, action: PayloadAction<string>) {
      state.initDataRaw = action.payload;
    },
    updateUserTokens(state, action: PayloadAction<number>) {
      if (!state.wallet) {
        state.wallet = { coins: 0 };
      }
      state.wallet.coins = action.payload;
    },
    updateFarmingData(state, action: PayloadAction<Partial<FarmingData>>) {
      state.farmingData = { ...state.farmingData, ...action.payload };
      return state;
    },
  },
});

export const { setInitDataRaw, updateUserTokens, updateFarmingData } =
  userSlice.actions;
export default userSlice.reducer;
