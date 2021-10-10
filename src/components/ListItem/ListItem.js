import styles from "./ListItem.module.css";

const ListItem = (props) => {
  let statusClassses;

  if (props.status === "Alive") {
    statusClassses = `${styles.status} ${styles.statusAlive}`;
  } else if (props.status === "Dead") {
    statusClassses = `${styles.status} ${styles.statusDead}`;
  } else {
    statusClassses = `${styles.status}`;
  }

  let typeClasses;
  if (props.type === "") {
    typeClasses = `${styles.type}`;
  }

  return (
    <li className={styles.cardItem}>
      <div className={styles.item}>
        <img src={props.image} alt={` character ${props.name}`} />
        <p className={styles.name}>{props.name}</p>
        <p>
          <span className={styles.paraName}>Species:</span> {props.species}
        </p>
        <p>
          <span className={styles.paraName}>Gender:</span> {props.gender}
        </p>
        <p>
          <span className={styles.paraName}>Status:</span>{" "}
          <span className={statusClassses}>{props.status}</span>
        </p>
        <p className={typeClasses}>
          <span className={styles.paraName}>Type:</span>{" "}
          <span className={styles.checkType}>{props.type}</span>
        </p>
        <p>
          <span className={styles.paraName}>Created:</span>{" "}
          {props.created.slice(0, 10)}
        </p>
      </div>
    </li>
  );
};

export default ListItem;
