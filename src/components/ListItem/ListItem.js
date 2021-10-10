import styles from "./ListItem.module.css";

const ListItem = (props) => {
  return (
    <li className={styles.cardItem}>
      <div className={styles.item}>
        <img src={props.image} alt={` character ${props.name}`} />
        <div>
          {props.id}. {props.name}
        </div>
        <p>Status: {props.status}</p>
        <p>Species: {props.species}</p>
        <p>Type: {props.type}</p>
        <p>Gender: {props.gender}</p>
        <p>Created: {props.created.slice(0, 10)}</p>
      </div>
    </li>
  );
};

export default ListItem;
