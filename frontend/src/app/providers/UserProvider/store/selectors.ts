import { RootState } from "../../../store/store";

export const selectInitDataRaw = (state: RootState) =>
  state.userInit.initDataRaw;
export const selectUserCoins = (state: RootState) =>
  state.userInit.wallet?.coins || 0;
export const selectFarmingData = (state: RootState) =>
  state.userInit.farmingData;
