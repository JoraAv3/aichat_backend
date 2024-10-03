import { RootState } from "../../../../app/store/store";

export const selectCurrentReward = (state: RootState) =>
  state.airDrop.currentTotalCoinsFarmed;
export const selectFarmingState = (state: RootState) => state.airDrop;
