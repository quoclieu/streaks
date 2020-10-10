import React, { FunctionComponent } from "react";
import styles from "./Task.module.scss";

interface Props {
  id?: string;
  name: string;
  count: number | null;
  icon: string;
  isComplete: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Task: FunctionComponent<Props> = ({
  id,
  icon,
  name,
  count,
  isComplete,
  onClick,
}) => {
  return (
    <div className={styles["container"]}>
      <div
        className={`${styles["progress-container"]} ${
          isComplete ? styles["task-complete"] : ""
        }`}
        onClick={onClick}
      >
        <span
          className={`iconify ${styles["icon"]}`}
          data-icon={icon}
          data-inline="false"
        />

        <div className={styles["count"]}>{count}</div>
      </div>
      <div className={styles["task-name"]}>{name}</div>
    </div>
  );
};
