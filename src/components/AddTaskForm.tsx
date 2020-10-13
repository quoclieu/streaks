import React, { FunctionComponent, useState } from "react";
import styles from "./AddTaskForm.module.scss";

interface Props {
  onClose: Function;
}

const icons = [
  "fa-solid:check",
  "mdi:arm-flex",
  "gg:block",
  "mdi:meditation",
  "mdi:pill",
  "mdi:carrot",
  "ri:quill-pen-line",
  "bx:bxs-camera",
];

export const AddTaskForm: FunctionComponent<Props> = ({ onClose }) => {
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);

  const handleSelectIcon = (icnIdx: number) => {
    setSelectedIconIndex(icnIdx);
    console.log(selectedIconIndex);
  };
  return (
    <div className={styles.container}>
      <header>
        <div className={styles["button-container"]}>
          <button onClick={() => onClose()}>
            <span
              className="iconify"
              data-icon="icomoon-free:cross"
              data-inline="false"
            ></span>
          </button>
        </div>
        <h2>Add Task</h2>
      </header>
      <div className={styles["check-icon-container"]}>
        <div key={icons[selectedIconIndex]}>
          <span
            className={`iconify ${styles["check-icon"]}`}
            data-icon={icons[selectedIconIndex]}
            data-inline="false"
          ></span>
        </div>
      </div>
      <form className={styles.form}>
        <div className={styles["sub-text"]}>
          <p>
            Tasks start each day as incomplete. Mark a task as done to increase
            your streak.
          </p>
          <label htmlFor="task-name">Title:</label>
        </div>
        <input
          id="task-name"
          name="task-name"
          type="text"
          placeholder="Enter task title..."
        />
        <div className={styles["sub-text"]}>0/28</div>
        <div className={styles["sub-text"]}>
          <label>Icon:</label>
          <div className={styles["icon-selection-container"]}>
            {icons.map((icon, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    handleSelectIcon(index);
                  }}
                >
                  <span
                    className={`iconify ${styles["icon"]} ${
                      index === selectedIconIndex ? styles["selected"] : ""
                    }`}
                    data-inline="false"
                    data-icon={icon}
                  ></span>
                </div>
              );
            })}
          </div>
        </div>
        <button disabled={true} type="submit">
          Save Task
        </button>
      </form>
    </div>
  );
};
