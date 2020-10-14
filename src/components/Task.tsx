import Icon from "@iconify/react";
import React, { FunctionComponent } from "react";
import styles from "./Task.module.scss";
import { IconEnum, TaskIcon } from "./TaskIcon";

interface Props {
  name: string;
  count: number | null;
  iconEnum?: IconEnum;
  icon?: object;
  isComplete: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Task: FunctionComponent<Props> = ({
  iconEnum,
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
        <div>
          {icon !== undefined ? (
            <Icon icon={icon} className={styles["icon"]} />
          ) : null}

          {iconEnum !== undefined ? (
            <TaskIcon className={styles["icon"]} iconEnum={iconEnum} />
          ) : null}
        </div>
        <div className={styles["count"]}>{count}</div>
      </div>
      <div className={styles["task-name"]}>{name}</div>
    </div>
  );
};
