export interface LeaderboardItem {
  id: number;
  username: string;
  coins: number;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardItem[];
  user_rank: number;
}
