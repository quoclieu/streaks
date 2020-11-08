import plusIcon from "@iconify/icons-fa-solid/plus";
import baselineSettings from "@iconify/icons-ic/baseline-settings";
import roundDeleteForever from "@iconify/icons-ic/round-delete-forever";
import { Icon } from "@iconify/react";
import format from "date-fns/format";
import sub from "date-fns/sub";
import firebase from "firebase";
import produce from "immer";
import publicIp from "public-ip";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./App.module.scss";
import { AddTaskForm } from "./components/AddTaskForm";
import { DatePicker } from "./components/DatePicker";
import { Task } from "./components/Task";
import { db } from "./services/firebase-config";
import { replacePropertyValuesInTasks } from "./utils/replacePropertyValuesInTasks";
import { Task as TaskType } from "./utils/types";

const DATE_FORMAT = "dd-MM-yy";

function App() {
  const [tasks, setNextTasksState] = useState<Array<TaskType>>([]);
  const [dbRef, setDbRef] = useState<firebase.database.Reference | null>(null);
  const [ipAddress, setIpAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetDate, setTargetDate] = useState(new Date());
  const [showDelete, setShowDelete] = useState(false);

  // load db ref according to user ip address
  useEffect(() => {
    publicIp.v4().then((ip) => {
      // firebase does not store keys with '.'
      // replace with '-'
      setIpAddress(ip.split(".").join("-"));
      setDbRef(db().ref(ip.split(".").join("-")));
    });
  }, []);

  // load data from db
  useEffect(() => {
    if (dbRef === null) return;

    dbRef
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        if (data === null) return;
        const currentDate = format(targetDate, DATE_FORMAT);
        const previousDate = format(sub(targetDate, { days: 1 }), DATE_FORMAT);

        if (currentDate in data) {
          // if today exists in the db, load the data into state.
          setNextTasksState(data[currentDate].tasks);
        } else if (previousDate in data) {
          // else load yesterday if it exists and clear all completes
          setNextTasksState(
            replacePropertyValuesInTasks(data[previousDate].tasks, {
              isCompleteToday: false,
            })
          );
        } else {
          if (Object.keys(data).length < 1) {
            setNextTasksState([]);
          } else {
            const lastestDate =
              data[Object.keys(data)[Object.keys(data).length - 1]];
            setNextTasksState(
              replacePropertyValuesInTasks(lastestDate.tasks, {
                isCompleteToday: false,
                count: 0,
              })
            );
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dbRef, targetDate]);

  // update db when local state updates
  const updateDbWithTasks = (newTasks: Array<TaskType>) => {
    db()
      .ref(ipAddress)
      .child(format(targetDate, DATE_FORMAT))
      .child("tasks")
      .set(newTasks);
  };

  const handleTaskClick = (task: TaskType, index: number) => {
    setShowDelete(false);
    let nextTasksState = tasks;
    if (!task.isCompleteToday) {
      nextTasksState = produce(tasks, (newTasks) => {
        newTasks[index] = {
          ...newTasks[index],
          isCompleteToday: true,
          count: newTasks[index].count += 1,
        };
        return newTasks;
      });
    } else {
      nextTasksState = produce(tasks, (newTasks) => {
        newTasks[index] = {
          ...newTasks[index],
          isCompleteToday: false,
          count: newTasks[index].count -= 1,
        };
        return newTasks;
      });
    }
    setNextTasksState(nextTasksState);
    updateDbWithTasks(nextTasksState);
  };

  const handleDelete = (index: number) => {
    const newState = produce(tasks, (newState) => {
      newState.splice(index, 1);
      return newState;
    });

    setNextTasksState(newState);
    updateDbWithTasks(newState);
  };

  if (dbRef === null || loading) return null;

  return (
    <>
      <button
        aria-label="settings"
        className={styles["settings-btn"]}
        onClick={() => setShowDelete(!showDelete)}
      >
        <Icon icon={baselineSettings} />
      </button>
      <header className={styles.heading}>
        <h1>STREAKS</h1>
        <DatePicker selected={targetDate} onChange={setTargetDate} />
      </header>
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
                    const nextTasksState = [
                      ...tasks,
                      {
                        name: title,
                        iconEnum,
                        count: 0,
                        isCompleteToday: false,
                        id: new Date().toString(),
                      },
                    ];
                    setNextTasksState(nextTasksState);
                    updateDbWithTasks(nextTasksState);
                  }}
                />
              )}
            </Route>
            <Route>
              {(routeProps) => (
                <section className={styles["tasks-container"]}>
                  {tasks.map((task, index) => {
                    return (
                      <div key={index}>
                        <Task
                          name={task.name}
                          iconEnum={task.iconEnum}
                          count={task.count}
                          isComplete={task.isCompleteToday}
                          onClick={() => {
                            handleTaskClick(task, index);
                          }}
                        />
                        {showDelete ? (
                          <div className={styles["delete-btn-container"]}>
                            <button
                              className={styles["delete-btn"]}
                              aria-label="delete"
                              onClick={() => handleDelete(index)}
                            >
                              <Icon icon={roundDeleteForever} />
                            </button>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                  {tasks.length < 6 ? (
                    <Task
                      name="Add a task"
                      icon={plusIcon}
                      count={null}
                      isComplete={false}
                      onClick={() => {
                        routeProps.history.push(`/add-task`);
                      }}
                    />
                  ) : null}
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
