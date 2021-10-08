import { useEffect, useState } from "react";
import ListItem from "../ListItem/ListItem";
import Button from "../UI/Button/Button";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import styles from "./FullList.module.css";

const FullList = () => {
  const [dataItems, setDataItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pagesToLoad, setPagesToLoad] = useState(5);
  const [bottomCounterIndicator, setBottomCounterIndicator] = useState(1);

  useEffect(() => {
    const getCharactersData = async () => {
      setIsLoading(true);
      const apiURL = "https://rickandmortyapi.com/api/character/";
      //   let apiData = [];

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
          //   apiData = apiData.concat(data.results);
          //   setDataItems((element) => element.concat(apiData));
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

  return (
    <section>
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
      <div>
        <Button loadMore={loadMorePagesHandler}>Show more results (100)</Button>
        <Button loadAll={loadAllDataHandler}>Show all results</Button>
      </div>
    </section>
  );
};

export default FullList;
