import { useEffect, useState } from "react";

import Button from "../UI/Button/Button";
import styles from "./Controls.module.css";

const Controls = (props) => {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const btnClasses = `${styles.btnWrapper} ${
    scroll ? `${styles.btnWrapperScroll}` : ""
  }`;

  return (
    <div className={btnClasses}>
      <Button loadMore={props.loadMore}>Show more results (100)</Button>
      <Button loadAll={props.loadAll}>Show all results</Button>
    </div>
  );
};

export default Controls;
