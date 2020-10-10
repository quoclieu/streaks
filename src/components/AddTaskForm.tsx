import React from "react";
import styles from "./AddTaskForm.module.scss";

export const AddTaskForm = () => {
  return (
    <div className={styles.container}>
      <header>
        <h2>Add Task</h2>
      </header>
      <form className={styles.form}>
        <p>
          Tasks start each day as incomplete. Mark a task as done to increase
          your streak.
        </p>
        <label htmlFor="task-name">Create your own</label>
        <input
          id="task-name"
          name="task-name"
          type="text"
          placeholder="Enter task title..."
        />
      </form>
    </div>
  );
};
