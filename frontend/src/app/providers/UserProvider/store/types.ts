export interface GetOrCreateDto {
  id: number;
  first_name: string;
  day: number;
  coinsCount: number;
  heSeeWelcomeScreen: boolean;
  age: number;
  age_coins: number;
  title: string;
  percent: number;
}

export interface GetOrCreateRequest {
  isPremium: boolean;
  inviteCode?: string;
}

export interface AccountResponse {
  id: number;
  age: number;
  inviteCode: string;
  heSeeWelcomeScreen: boolean;
  reffers: any[];
  completedTasks: any[];
}

export interface FarmResponse {
  id: number;
  created_at: string;
  updated_at: string;
  wallet: number;
  status: string;
}

export interface WalletResponse {
  id: number;
  coins: number;
  reward: {
    ticketCount: number;
    id: number;
    lastReward: string;
    coinsCount: number;
    day: number;
  };
  farm?: FarmResponse;
}

export interface GetMeDto {
  id: number;
  last_name: string;
  first_name: string;
  username: string;
  account: AccountResponse;
  wallet: WalletResponse;
  taskRewardAmount: number;
  time_passed: number | null;
  need_to_claim: boolean;
  current_farm_reward: number | null;
  plus_every_second: number | null;
  total_duration: number;
  total_farm_reward: number | null;
}

export interface FarmingData {
  timePassed: number;
  needToClaim: boolean;
  taskRewardAmount?: number;
  currentFarmReward?: number;
  plusEverySecond?: number;
  totalDuration?: number;
  totalFarmReward?: number;
}
