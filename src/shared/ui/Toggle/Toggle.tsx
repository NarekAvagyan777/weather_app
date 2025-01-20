import { ChangeEvent } from "react";
import styles from "./Toggle.module.scss";

type ToggleProps = {
  onOptionChange: (e: ChangeEvent<HTMLInputElement>) => void;
  weatherUnit: string;
};

export const Toggle = ({ onOptionChange, weatherUnit }: ToggleProps) => {
  return (
    <div className={styles.toggle}>
      <div className={styles.toggle_switch}>
        <div>
          <input
            type="radio"
            id="CELSIUS"
            name="weather_unit"
            value="CELSIUS"
            checked={weatherUnit === "metric"}
            onChange={onOptionChange}
          />
          <label className={styles.label} htmlFor="CELSIUS">
            CELSIUS
          </label>
        </div>

        <div>
          <input
            type="radio"
            id="FARENHEIT"
            name="weather_unit"
            value="FARENHEIT"
            checked={weatherUnit === "imperial"}
            onChange={onOptionChange}
          />
          <label className={styles.label} htmlFor="FARENHEIT">
            FARENHEIT
          </label>
        </div>
        <br />
      </div>
    </div>
  );
};
