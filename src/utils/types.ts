import { IconEnum } from "../components/TaskIcon";

export type Task = {
  id: string;
  name: string;
  iconEnum: IconEnum;
  count: number;
  isCompleteToday: boolean;
};
