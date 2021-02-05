
import React from 'react';
import { useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { Loading } from './Loading';
import { SummonerProfileCard } from './small_components';
import { UserMenuBar } from './UserMenuBar';


export const ProfileMenu = () => {
    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { isLoading: getSummonerIsLoading, error: summonerInfoError, summonerInfo } = getSummonerStore;

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
