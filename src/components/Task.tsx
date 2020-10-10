import React, { FunctionComponent, ReactNode } from "react";
import styles from "./Task.module.scss";

interface Props {
  icon: ReactNode;
  name: string;
  count: number;
}

export const Task: FunctionComponent<Props> = ({ icon, name, count }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["progress-container"]}>
        <div className={styles["icon"]}>{icon}</div>
        <div>{count}</div>
      </div>
      <div className={styles["task-name"]}>{name}</div>
    </div>
  );
};
