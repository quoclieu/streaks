import Icon from "@iconify/react";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
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
  const [showComplete, setShowComplete] = useState(isComplete);

  useEffect(() => {
    if (isComplete) {
      // buffer the completed styles so the progress bar completes its animation first
      setTimeout(() => {
        setShowComplete(true);
      }, 500);
    } else {
      setShowComplete(false);
    }
  }, [isComplete]);

  return (
    <>
      <div className={styles["container"]}>
        <div
          className={`${styles["progress-container"]} ${
            showComplete ? styles["task-complete"] : ""
          }`}
          onClick={onClick}
        >
          <CircularProgressbarWithChildren
            value={isComplete ? 100 : 0}
            strokeWidth={6}
            background={true}
            styles={buildStyles({
              strokeLinecap: "butt",
              textSize: "16px",
              pathTransitionDuration: 0.5,
              pathColor: `white`,
              textColor: "#f88",
              trailColor: showComplete ? "white" : "#9d2607",
              backgroundColor: showComplete ? "white" : "transparent",
            })}
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
          </CircularProgressbarWithChildren>
          <div className={styles["task-name"]}>{name}</div>
        </div>
      </div>
    </>
  );
};
