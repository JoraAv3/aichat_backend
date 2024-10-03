// types.ts

export interface Task {
  id: number;
  title: string;
  description: string;
  amount: number;
  icon: string;
  link: string;
}

export interface CheckTaskRequest {
  task_id: number;
}

export interface FetchTasksResponse {
  tasks: Task[];
}
