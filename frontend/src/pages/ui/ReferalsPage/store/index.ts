// referralsApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../../app/store/api"; // Adjust the path as necessary

// Define the structure of a referral response
interface ReferralUser {
  id: number;
  last_name: string;
  first_name: string;
  username: string;
}

export interface Referral {
  id: number;
  earned_coins: number;
  user: ReferralUser;
}

interface FetchReferralsRequest {
  initData: string;
}

export const referralsApi = createApi({
  reducerPath: "referralsApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchReferrals: builder.query<Referral[], FetchReferralsRequest>({
      query: ({ initData }) => ({
        url: "/referrals/",
        method: "GET",
        params: { initData },
      }),
    }),
  }),
});

export const { useFetchReferralsQuery } = referralsApi;
