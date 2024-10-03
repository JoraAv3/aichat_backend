import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../store/api";
import { GetMeDto, GetOrCreateDto, GetOrCreateRequest } from "./types";

interface SaveWalletRequest {
  name: string;
  address: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getOrCreate: builder.query<GetOrCreateDto, GetOrCreateRequest>({
      query: (params: GetOrCreateRequest) => ({
        url: "users/get-or-create/",
        method: "POST",
        body: JSON.stringify(params),
      }),
    }),
    getMe: builder.query<GetMeDto, void>({
      query: () => ({
        url: "users/me/",
        method: "GET",
      }),
    }),
    saveWalletAddress: builder.mutation<void, SaveWalletRequest>({
      query: (params: SaveWalletRequest) => ({
        url: "users/save_wallet_address",
        method: "POST",
        body: JSON.stringify(params),
      }),
    }),
  }),
});

export const {
  useLazyGetOrCreateQuery,
  useLazyGetMeQuery,
  useSaveWalletAddressMutation,
} = userApi;
