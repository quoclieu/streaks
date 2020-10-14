import plusIcon from "@iconify/icons-fa-solid/plus";
import produce from "immer";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./App.module.scss";
import { AddTaskForm } from "./components/AddTaskForm";
import { Task } from "./components/Task";
import { IconEnum } from "./components/TaskIcon";

type Task = {
  id: string;
  name: string;
  iconEnum: IconEnum;
  count: number;
  isComplete: boolean;
};

const data: Array<Task> = [
  {
    id: "1",
    name: "meditate",
    iconEnum: IconEnum.Meditation,
    count: 0,
    isComplete: false,
  },
];

function App() {
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
        <Router>
          <Switch>
            <Route path={`/add-task`}>
              {(routeProps) => (
                <AddTaskForm
                  onClose={() => {
                    routeProps.history.push("/");
                  }}
                  onSave={(iconEnum, title) => {
                    setNewTasks([
                      ...tasks,
                      {
                        name: title,
                        iconEnum,
                        count: 0,
                        isComplete: false,
                        id: new Date().toDateString(),
                      },
                    ]);
                  }}
                />
              )}
            </Route>
            <Route>
              {(routeProps) => (
                <section className={styles["tasks-container"]}>
                  {tasks.map((task, index) => {
                    return (
                      <Task
                        key={task.id}
                        name={task.name}
                        iconEnum={task.iconEnum}
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
                    icon={plusIcon}
                    count={null}
                    isComplete={false}
                    onClick={() => {
                      routeProps.history.push(`/add-task`);
                    }}
                  />
                </section>
              )}
            </Route>
          </Switch>
        </Router>
      </main>
    </>
  );
}

export default App;
