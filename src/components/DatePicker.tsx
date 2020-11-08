import React, { FunctionComponent } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePicker.module.scss";
import "./DatePickerOverrideStyles.scss";

interface Props {
  selected: Date;
  onChange: Function;
}

export const DatePicker: FunctionComponent<Props> = ({
  selected,
  onChange,
}) => {
  return (
    <ReactDatePicker
      selected={selected}
      onChange={(date) => onChange(date)}
      dateFormat="dd/MM/yyyy"
      customInput={<CustomInput />}
      calendarClassName={styles["calendar"]}
    />
  );
};

const CustomInput: FunctionComponent<any> = ({ value, onClick }) => {
  return (
    <button className={styles["date-button"]} onClick={onClick}>
      {value}
    </button>
  );
};
