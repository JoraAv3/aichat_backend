export interface ClaimFarmResponse {
  coins: number;
}

export enum FarmingStatus {
  PROCESS = "Process",
  START_MINING = "Start mining",
  CLAIM = "Claim",
}
