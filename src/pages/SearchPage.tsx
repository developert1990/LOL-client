import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { FaSearch } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import { getSummoner } from '../actions/getSummonerAction';
import { GET_SUMMONER_DETAIL_RESET, GET_SUMMONER_GAMES_100_RESET } from '../constants/getSummonerConstants';
import { THREE_GAMES_DETAIL_RESET } from '../constants/getGamesDetailConstants';
import { useQuery } from '../hooks';


export const SearchPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const regionStore = useSelector((state: initialAppStateType) => state.regionStore);
    const { region } = regionStore;

    const [summonerID, setSummonerID] = useState('');


    console.log("SearchPage")
    console.log('summonerID', summonerID.length)

    const query = useQuery();


    useEffect(() => {
        if (summonerID.length === 0) {
            dispatch({ type: THREE_GAMES_DETAIL_RESET });
            dispatch({ type: GET_SUMMONER_DETAIL_RESET });
            dispatch({ type: GET_SUMMONER_GAMES_100_RESET });
            dispatch(getSummoner(query.name, region));
        }
    }, [])

    const handleClick = async (e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
        if (!(summonerID.length > 0)) {
            return alert("Should enter summoner's id")
        }
        dispatch({ type: THREE_GAMES_DETAIL_RESET });
        dispatch({ type: GET_SUMMONER_DETAIL_RESET });
        dispatch({ type: GET_SUMMONER_GAMES_100_RESET });
        dispatch(getSummoner(summonerID, region));
        setSummonerID("");
        history.push(`/search/userInfo/overview/${region}?name=${summonerID}`);

    }


    // input 에 focusing useRef() 사용
    const focusRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (focusRef && focusRef.current !== null) {
            focusRef.current.focus();
        }
    }, [dispatch]);



    return (
        <div className="wrap">

            <div className="search">
                {/* <input type="text" className="summoner-id" placeholder="Enter the Summoner's ID" onChange={e => setSummonerID(e.target.value)} value={summonerID} /> */}
                <input type="text" className="searchTerm" placeholder="Enter the Summoner's ID" onChange={(e: ChangeEvent<HTMLInputElement>) => setSummonerID(e.target.value)} onKeyPress={
                    (e) => {
                        if (e.key === 'Enter')
                            handleClick(e);
                    }
                } value={summonerID} ref={focusRef} />
                <button type="submit" className="searchButton" onClick={(e: any) => handleClick(e)}>
                    <FaSearch />
                </button>
            </div>

            {/* 아래에 꺼 붙여 넣으면 됨 */}


        </div>

    )
}













