import React, { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { FaSearch } from "react-icons/fa";
import { Loading } from '../components/Loading';
import { Link, useHistory } from 'react-router-dom';
import { getSummoner } from '../actions/getSummonerAction';
import { ProfilePage } from './ProfilePage';
import { GET_SUMMONER_RESET } from '../constants/getSummonerConstants';


export const SearchPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const regionStore = useSelector((state: initialAppStateType) => state.regionStore);
    const { region } = regionStore;
    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { isLoading: getSummonerIsLoading, error, summonerInfo } = getSummonerStore;
    console.log('summonerInfo ==> ', summonerInfo)

    // console.log('region: ', region)
    const [summonerID, setSummonerID] = useState('');
    const [errorMsg, setErrorMsg] = useState(false);

    // console.log("1")
    // console.log("2")
    // 비동기 - 기다려주지 않는다
    // 동기 - 기다려준다.
    const handleClick = async (e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
        if (!(summonerID.length > 0)) {
            return alert("Should enter summoner's id")
        }
        dispatch(getSummoner(summonerID, region));
        history.push(`/search/userInfo/overview/${region}?name=${summonerID}`)
        setSummonerID("");
    }


    // input 에 focusing useRef() 사용
    const focusRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (focusRef && focusRef.current !== null) {
            focusRef.current.focus();
        }
        // return () => {
        //     dispatch({ type: GET_SUMMONER_RESET });
        // }
    }, [dispatch])



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













