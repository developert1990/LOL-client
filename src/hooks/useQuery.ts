import { useState, useEffect } from 'react'

interface QueryStringObj {
    [key: string]: string;
}

export const useQuery = () => {
    const [query, setQuery] = useState({});

    useEffect(() => {
        const queryString = window.location.search.slice(1).split('&').reduce((acc: QueryStringObj, cur: string) => {
            const curSplit = cur.split('=');
            acc[curSplit[0]] = curSplit[1];
            return acc;
        }, {});
        setQuery(queryString);
    }, []);

    return query;
}