// store/leaderboardApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../../app/store/api";
import { LeaderboardResponse } from "./types";

export const leaderboardApi = createApi({
  reducerPath: "leaderboardApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchLeaderboard: builder.query<LeaderboardResponse, void>({ 
      query: () => ({
        url: "leaderboard/",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchLeaderboardQuery } = leaderboardApi;
