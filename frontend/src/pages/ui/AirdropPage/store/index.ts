import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../../app/store/api";
import { ClaimFarmResponse } from "./types";

export const farmApi = createApi({
  reducerPath: "farmApi",
  baseQuery,
  endpoints: (builder) => ({
    startFarm: builder.mutation<void, void>({
      query: () => ({
        url: "/farm/start/",
        method: "POST",
      }),
    }),
    claimFarm: builder.mutation<ClaimFarmResponse, void>({
      query: () => ({
        url: "/farm/claim/",
        method: "POST",
      }),
    }),
  }),
});

export const { useStartFarmMutation, useClaimFarmMutation } = farmApi;
