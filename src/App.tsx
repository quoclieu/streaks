import plusIcon from "@iconify/icons-fa-solid/plus";
import format from "date-fns/format";
import sub from "date-fns/sub";
import firebase from "firebase";
import produce from "immer";
import publicIp from "public-ip";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./App.module.scss";
import { AddTaskForm } from "./components/AddTaskForm";
import { Task } from "./components/Task";
import { db } from "./services/firebase-config";
import { replacePropertyValuesInTasks } from "./utils/replacePropertyValuesInTasks";
import { Task as TaskType } from "./utils/types";

const DATE_FORMAT = "dd-MM-yy";

function App() {
  const [tasks, setNewTasks] = useState<Array<TaskType>>([]);
  const [dbRef, setDbRef] = useState<firebase.database.Reference | null>(null);
  const [ipAddress, setIpAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetDate, setNewTargetDate] = useState(new Date());

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
          setNewTasks(data[currentDate].tasks);
        } else if (previousDate in data) {
          // else load yesterday if it exists and clear all completes
          setNewTasks(
            replacePropertyValuesInTasks(data[previousDate].tasks, {
              isCompleteToday: false,
            })
          );
        } else {
          // else load last date but clear all counts and completes
          if (Object.keys(data).length < 1) return;
          else {
            const lastestDate =
              data[Object.keys(data)[Object.keys(data).length - 1]];
            setNewTasks(
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
  useEffect(() => {
    if (!ipAddress) return;
    if (tasks.length === 0) return;
    db()
      .ref(ipAddress)
      .child(format(targetDate, DATE_FORMAT))
      .child("tasks")
      .set(tasks);
  }, [ipAddress, targetDate, tasks]);

  const handleTaskClick = (task: TaskType, index: number) => {
    if (!task.isCompleteToday) {
      setNewTasks((prevTasks) => {
        return produce(prevTasks, (newTasks) => {
          newTasks[index] = {
            ...newTasks[index],
            isCompleteToday: true,
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
            isCompleteToday: false,
            count: newTasks[index].count -= 1,
          };
          return newTasks;
        });
      });
    }
  };

  if (dbRef === null || loading) return null;

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
                        isCompleteToday: false,
                        id: new Date().toString(),
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
                        isComplete={task.isCompleteToday}
                        onClick={() => {
                          handleTaskClick(task, index);
                        }}
                      />
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
