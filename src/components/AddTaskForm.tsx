import timesIcon from "@iconify/icons-fa-solid/times";
import { Icon } from "@iconify/react";
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./AddTaskForm.module.scss";
import { IconEnum, TaskIcon } from "./TaskIcon";
interface Props {
  onSave: (iconEnum: IconEnum, title: string) => void;
  onClose: () => void;
}

const icons = Object.values(IconEnum);

export const AddTaskForm: FunctionComponent<Props> = ({ onSave, onClose }) => {
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [textLength, setTextLength] = useState(0);
  const history = useHistory();

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(icons[selectedIconIndex], title);
    history.push("/");
  };

  const handleSelectIcon = (icnIdx: number) => {
    setSelectedIconIndex(icnIdx);
  };
  return (
    <div className={styles.container}>
      <header>
        <div className={styles["button-container"]}>
          <div onClick={() => onClose()}>
            <Icon icon={timesIcon} />
          </div>
        </div>
        <h2>Add Task</h2>
      </header>
      <div className={styles["selected-icon-container"]}>
        <TaskIcon
          className={styles["selected-icon"]}
          iconEnum={icons[selectedIconIndex]}
        />
      </div>
      <div style={{ height: 40 }}>
        <div className={styles["title-container"]}>{title}</div>
      </div>

      <form className={styles.form} onSubmit={submitForm}>
        <div className={styles["sub-text"]}>
          <p>
            Tasks start each day as incomplete. Mark a task as done to increase
            your streak.
          </p>
          <div style={{ marginTop: "2rem" }}>
            <label htmlFor="task-name">Title:</label>
          </div>
        </div>
        <input
          id="task-name"
          name="task-name"
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const inputValLength = e.target.value.length;
            if (inputValLength <= 28) {
              setTitle(e.target.value);
              setTextLength(inputValLength);
            }
            if (inputValLength > 0) {
              setCanSubmit(true);
            } else {
              setCanSubmit(false);
            }
          }}
        />
        <div className={styles["sub-text"]}>{textLength}/28</div>
        <div style={{ marginTop: "2rem" }}>
          <div className={styles["sub-text"]}>
            <label>Icon:</label>
            <div className={styles["icon-selection-container"]}>
              {icons.map((icon, index) => {
                return (
                  <div key={index} onClick={() => handleSelectIcon(index)}>
                    <TaskIcon
                      iconEnum={icon}
                      className={`${styles["icon"]} ${
                        index === selectedIconIndex ? styles["selected"] : ""
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <button disabled={!canSubmit} type="submit">
          Save Task
        </button>
      </form>
    </div>
  );
};
