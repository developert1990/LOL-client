
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSummoner } from '../actions/getSummonerAction';
import { THREE_GAMES_DETAIL_RESET } from '../constants/getGamesDetailConstants';
import { GET_SUMMONER_DETAIL_RESET, GET_SUMMONER_GAMES_100_RESET } from '../constants/getSummonerConstants';
import { useQuery } from '../hooks';
import { initialAppStateType } from '../store';
import { Loading } from './Loading';
import { SummonerProfileCard } from './small_components';
import { UserMenuBar } from './UserMenuBar';


export const ProfileMenu = () => {
    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { isLoading: getSummonerIsLoading, error: summonerInfoError, summonerInfo } = getSummonerStore;
    const regionStore = useSelector((state: initialAppStateType) => state.regionStore);
    const { region } = regionStore;

    const dispatch = useDispatch();
    const query: {
        [key: string]: string;
    } = useQuery();


    console.log('query', query)

    // useEffect(() => {
    //     console.log("프로필메뉴 유즈이펙")
    //     if (query && query.name) {
    //         console.log("쿼리 안에 들어옴", query.name)
    //         dispatch({ type: THREE_GAMES_DETAIL_RESET });
    //         dispatch({ type: GET_SUMMONER_DETAIL_RESET });
    //         dispatch({ type: GET_SUMMONER_GAMES_100_RESET });
    //         dispatch(getSummoner(query.name, region));
    //     }
    // }, [])

    return (
        <>
            { getSummonerIsLoading ?
                <Loading /> :
                !summonerInfoError ?
                    <div className="summoner_info_top">
                        <SummonerProfileCard summonerInfo={summonerInfo} />
                        <UserMenuBar summonerInfo={summonerInfo} />
                    </div>
                    :
                    <div style={{ color: "red" }} className="summoner-error">
                        {summonerInfoError}
                        <div> This summoner is not registered at H.GG.<br /> Please check spelling and region</div>
                    </div>
            }
        </>
    )
}
