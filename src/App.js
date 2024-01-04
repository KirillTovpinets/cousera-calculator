import { useState } from "react";
import styles from "./App.module.css";
import Button from "./Button";

function App() {
  const buttons = [
    ["AC", "+/-", "/"],
    ["7", "8", "9", "x"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "", "="],
  ];

  const [value, setValue] = useState();
  const [savedValue, setSavedValue] = useState();
  const [operation, setOperation] = useState();
  const [executed, setExecuted] = useState(false);

  const executeOperation = () => {
    let result;
    if (!savedValue) {
      return value;
    }
    switch (operation) {
      case "+": {
        result = value + savedValue;
        break;
      }
      case "-": {
        result = savedValue - value;
        break;
      }
      case "x": {
        result = value * savedValue;
        break;
      }
      case "/": {
        result = value / savedValue;
        break;
      }
    }
    setOperation(null);
    setExecuted(true);
    setValue(result);
    return result;
  };
  const handleButtonClick = (e) => {
    if (value === "") {
      return;
    }

    const button = e.target.innerHTML;

    if (!isNaN(parseInt(button))) {
      if (executed) {
        setValue(parseInt(button));
        setExecuted(false);
      } else {
        setValue(parseInt((value || 0) + button));
      }
    } else {
      switch (button) {
        case "AC": {
          setValue(0);
          setSavedValue(null);
          setOperation(null);
          break;
        }
        case "+/-": {
          setValue(0 - value);
          break;
        }
        case "=": {
          executeOperation();
          break;
        }
        default: {
          const result = executeOperation();
          setSavedValue(result);
          setOperation(button);
          setExecuted(true);
        }
      }
    }
  };
  return (
    <div className={styles.appContainer}>
      <div className={styles.calculator}>
        <input value={value} />
        <ul className={styles.container} onClick={handleButtonClick}>
          {buttons.map((b) => (
            <li className={styles.button}>
              {b.map((i) => (
                <Button char={i} />
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
