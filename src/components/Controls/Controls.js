import { useEffect, useState } from "react";

import Button from "../UI/Button/Button";
import styles from "./Controls.module.css";

const Controls = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
    props.getInput(inputValue);
  }, [props, inputValue]);

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const btnClasses = `${styles.btnWrapper} ${
    scroll ? `${styles.btnWrapperScroll}` : ""
  }`;

  const sortingText = `${props.sortState ? "Sort by ID" : "Sort by name"}`;

  return (
    <section className={btnClasses}>
      <div className={styles.btnElements}>
        <Button loadMore={props.loadMore}>Show more results (100)</Button>
        <Button loadAll={props.loadAll}>Show all results</Button>
        <Button sortByName={props.sortByName}>{sortingText}</Button>
      </div>
      <input
        type="text"
        placeholder="Search by character name..."
        className={styles.input}
        onChange={inputChangeHandler}
      />
    </section>
  );
};

export default Controls;
