import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button onClick={props.loadMore || props.loadAll} className={styles.Button}>
      {props.children}
    </button>
  );
};

export default Button;
