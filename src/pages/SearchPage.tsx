import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { FaSearch } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import { getSummoner } from '../actions/getSummonerAction';


export const SearchPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const regionStore = useSelector((state: initialAppStateType) => state.regionStore);
    const { region } = regionStore;


    const [summonerID, setSummonerID] = useState('');

    const handleClick = async (e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
        if (!(summonerID.length > 0)) {
            return alert("Should enter summoner's id")
        }
        history.push(`/search/userInfo/overview/${region}?name=${summonerID}`);
        dispatch(getSummoner(summonerID, region));
        setSummonerID("");

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













