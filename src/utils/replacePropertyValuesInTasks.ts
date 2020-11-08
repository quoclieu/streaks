import { Task } from "./types";

export const replacePropertyValuesInTasks = (
  tasks: Array<Task>,
  replacement: Partial<Task>
) => {
  return tasks.map((task) => {
    return { ...task, ...replacement };
  });
};
