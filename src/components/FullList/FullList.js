import { useEffect, useState } from "react";
import ListItem from "../ListItem/ListItem";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

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
      let apiData = [];

      try {
        for (let i = bottomCounterIndicator; i <= pagesToLoad && i <= 34; i++) {
          const response = await fetch(apiURL + "?page=" + i);
          if (!response.ok) {
            throw new Error("Something went wrong!");
          }
          const data = await response.json();
          apiData = apiData.concat(data.results);
        }
      } catch (error) {
        setError(error.message);
      }

      setDataItems((element) => element.concat(apiData));
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
    <div>
      <ul>
        {error ? `${error}` : ""}
        {dataItems.map((element) => {
          return (
            <ListItem key={element.id} id={element.id} name={element.name} />
          );
        })}
      </ul>
      {isLoading && <LoadingSpinner />}
      <button onClick={loadMorePagesHandler}>Show more results (100)</button>
      <button onClick={loadAllDataHandler}>Show all results</button>
    </div>
  );
};

export default FullList;
