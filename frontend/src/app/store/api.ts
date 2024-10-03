import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { API_URL } from "../../shared/Constants";
import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-type", "application/json");
    const initData = (getState() as RootState).userInit.initDataRaw;
    if (initData) {
      headers.set("User-Init-Data", initData);
    }
    return headers;
  },
});

export default baseQuery;
