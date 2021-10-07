import { useEffect, useState } from "react";

const FullList = () => {
    const [dataItems, setDataItems] = useState([]);

    const [pagesToLoad, setPagesToLoad] = useState(5);
    const [bottomCounterIndicator, setBottomCounterIndicator] = useState(1);

    useEffect(() => {
        const getCharactersData = async () => {
            const apiURL = "https://rickandmortyapi.com/api/character/";
            let apiData = [];

            for (let i = bottomCounterIndicator; i <= pagesToLoad && i <= 34; i++) {
                const response = await fetch(apiURL + "?page=" + i);
                const data = await response.json();
                apiData = apiData.concat(data.results);
            }

            setDataItems((element) => element.concat(apiData));
        }
        getCharactersData();
    }, [pagesToLoad, bottomCounterIndicator])

    const loadMorePagesHandler = () => {
        setBottomCounterIndicator(pagesToLoad + 1);
        setPagesToLoad((state) => {
            return state + 3;
        });
    };

    const loadAllDataHandler = () => {
        setBottomCounterIndicator(pagesToLoad + 1);
        setPagesToLoad(34);
    };

    return (
        <div>
            <ul>
                {dataItems.map((element) => {
                    return <li key={element.id}>{element.id}. {element.name}</li>;
                })}
            </ul>
            <button onClick={loadMorePagesHandler}>Show more results ({ })</button>
            <button onClick={loadAllDataHandler}>Show all results</button>
        </div>
    )
}

export default FullList;
