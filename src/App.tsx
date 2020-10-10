import React from "react";
import styles from "./App.module.scss";
import { Task } from "./components/Task";
console.log(styles);

function App() {
  return (
    <div className={styles.container}>
      <h1>Streaks</h1>
      <main className={styles["tasks-container"]}>
        <Task icon="sas" name="meditate" count={3} />
      </main>
    </div>
  );
}

export default App;
