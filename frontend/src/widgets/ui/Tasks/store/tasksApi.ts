import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../../app/store/api";
import { Task, CheckTaskRequest } from "./types";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    fetchTasks: builder.query<Task[], void>({
      query: () => ({
        url: "task/",
        method: "GET",
      }),
      transformResponse: (response: { Partners: Task[] }) => response.Partners,
    }),
    checkTask: builder.mutation<void, CheckTaskRequest>({
      query: (params: CheckTaskRequest) => ({
        url: "task/check/",
        method: "POST",
        body: { task_id: params.task_id },
      }),
    }),
  }),
});

export const { useFetchTasksQuery, useCheckTaskMutation } = tasksApi;
