import { profile } from 'console';
import React from 'react';
import { useSelector } from 'react-redux';
import { API } from '../config';
import { initialAppStateType } from '../store';
import { Loading } from './Loading';
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
                        <div className="summoner_profile">
                            <div className="logo-name-link link">
                                <div className="level_img">
                                    <span className="level">{summonerInfo?.summonerLevel}</span>
                                    <img className="logo-img" src={`${API.GET_PROFILEICON}/${summonerInfo?.profileIconId}.png`} alt="profileIcon" />
                                </div>
                                <span className="name">{summonerInfo?.name}</span>
                            </div>
                        </div>
                        <div className="summoner_menu">
                            <UserMenuBar />
                        </div>
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
