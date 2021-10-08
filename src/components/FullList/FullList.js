import { useEffect, useState } from "react";
import ListItem from '../ListItem/ListItem';

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
                {dataItems.map((element) => {
                    return <ListItem key={element.id} id={element.id} name ={element.name}/>
                })}
            </ul>
            <button onClick={loadMorePagesHandler}>Show more results (100)</button>
            <button onClick={loadAllDataHandler}>Show all results</button>
        </div>
    )
}

export default FullList;
