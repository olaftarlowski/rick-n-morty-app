import { useEffect, useState } from "react";
import Controls from "../Controls/Controls";
import ListItem from "../ListItem/ListItem";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import styles from "./FullList.module.css";

const FullList = () => {
  const [dataItems, setDataItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pagesToLoad, setPagesToLoad] = useState(5);
  const [bottomCounterIndicator, setBottomCounterIndicator] = useState(1);
  const [getInputValue, setGetInputValue] = useState("");

  useEffect(() => {
    const getCharactersData = async () => {
      setIsLoading(true);
      const apiURL = "https://rickandmortyapi.com/api/character/";

      try {
        for (let i = bottomCounterIndicator; i <= pagesToLoad && i <= 34; i++) {
          const response = await fetch(apiURL + "?page=" + i);
          if (!response.ok) {
            throw new Error("Something went wrong!");
          }
          const data = await response.json();
          setDataItems((el) => {
            return el.concat(data.results);
          });
        }
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    };
    getCharactersData();
  }, [pagesToLoad, bottomCounterIndicator]);

  const loadMorePagesHandler = () => {
    setBottomCounterIndicator(pagesToLoad + 1);
    setPagesToLoad((state) => {
      return state + 5;
    });
  };

  const loadAllDataHandler = () => {
    setBottomCounterIndicator(pagesToLoad + 1);
    setPagesToLoad(34);
  };

  const getInputHandler = (data) => {
    setGetInputValue(data);
  };

  return (
    <>
      <section className={styles.contentWrapper}>
        <Controls
          loadMore={loadMorePagesHandler}
          loadAll={loadAllDataHandler}
          getInput={getInputHandler}
        ></Controls>

        <ul className={styles.listWrapper}>
          {error ? `${error}` : ""}
          {dataItems.map((element) => {
            return (
              <ListItem
                key={element.id}
                id={element.id}
                status={element.status}
                species={element.species}
                type={element.type}
                gender={element.gender}
                image={element.image}
                created={element.created}
                name={element.name}
              />
            );
          })}
        </ul>
        {isLoading && <LoadingSpinner />}
      </section>
    </>
  );
};

export default FullList;
