import produce from "immer";
import React, { useState } from "react";
import styles from "./App.module.scss";
import { AddTaskForm } from "./components/AddTaskForm";
import { Task } from "./components/Task";

type Task = {
  id: string;
  name: string;
  icon: string;
  count: number;
  isComplete: boolean;
};

const data = [
  {
    id: "1",
    name: "meditate",
    icon: "mdi:meditation",
    count: 0,
    isComplete: false,
  },
];

function App() {
  const [showAddTaskForm, setShowAddTaskForm] = useState(true);
  const [tasks, setNewTasks] = useState<Array<Task>>(data);

  const handleTaskClick = (task: Task, index: number) => {
    if (!task.isComplete) {
      setNewTasks((prevTasks) => {
        return produce(prevTasks, (newTasks) => {
          newTasks[index] = {
            ...newTasks[index],
            isComplete: true,
            count: newTasks[index].count += 1,
          };
          return newTasks;
        });
      });
    } else {
      setNewTasks((prevTasks) => {
        return produce(prevTasks, (newTasks) => {
          newTasks[index] = {
            ...newTasks[index],
            isComplete: false,
            count: newTasks[index].count -= 1,
          };
          return newTasks;
        });
      });
    }
  };

  return (
    <>
      <div className={styles.heading}>
        <h1>STREAKS</h1>
      </div>
      <main>
        <section className={styles["tasks-container"]}>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task.id}
                id={task.id}
                name={task.name}
                icon={task.icon}
                count={task.count}
                isComplete={task.isComplete}
                onClick={() => {
                  handleTaskClick(task, index);
                }}
              />
            );
          })}
          <Task
            name="Add a task"
            icon="fa-solid:plus"
            count={null}
            isComplete={false}
            onClick={() => setShowAddTaskForm(true)}
          />
        </section>
        {showAddTaskForm ? (
          <AddTaskForm
            onClose={() => {
              setShowAddTaskForm(false);
            }}
          />
        ) : null}
      </main>
    </>
  );
}

export default App;
