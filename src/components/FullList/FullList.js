import { useEffect, useState } from "react";
import Controls from "../Controls/Controls";
import ListItem from "../ListItem/ListItem";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import styles from "./FullList.module.css";
// import Pagination from "../Pagination/Pagination";

const FullList = () => {
  const [dataItems, setDataItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pagesToLoad, setPagesToLoad] = useState(1);
  const [bottomCounterIndicator, setBottomCounterIndicator] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [sortByName, setSortByName] = useState(false);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(16);

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
    setInputValue(data);
  };
  const sortByNameHandler = () => {
    setSortByName((sortState) => !sortState);
  };
  if (sortByName) {
    dataItems.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  } else {
    dataItems.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  }

  // // pagination
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className={styles.contentWrapper}>
        <Controls
          loadMore={loadMorePagesHandler}
          loadAll={loadAllDataHandler}
          sortState={sortByName}
          sortByName={sortByNameHandler}
          getInput={getInputHandler}
        ></Controls>
        {/* <Pagination
          postsPerPage={postsPerPage}
          totalPosts={dataItems.length}
          paginate={paginate}
        /> */}
        <ul className={styles.listWrapper}>
          {error ? `${error}` : ""}
          {
            dataItems
              .filter((filtItem) => {
                if (!inputValue) return true;
                const lowerCasedInput = inputValue.toLowerCase();
                return (
                  filtItem.id === inputValue ||
                  filtItem.name.toLowerCase().includes(lowerCasedInput)
                );
              })
              .map((element) => {
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
              })
            // .slice(indexOfFirstPost, indexOfLastPost)
          }
        </ul>
        {isLoading && <LoadingSpinner />}
      </section>
    </>
  );
};

export default FullList;
