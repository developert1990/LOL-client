import React from 'react'
import { useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { ProfileMenu } from './ProfileMenu'
import { UserMenuBar } from './UserMenuBar'

export const Masteries = () => {
    // const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    // const { isLoading: getSummonerIsLoading, error, summonerInfo } = getSummonerStore;
    // const {profileIconId, id, name, summonerLevel:level} = summonerInfo;
    return (
        <div className="summoner_info_top">

            {/* <Profile profileIconId={profileIconId} level={level} name={name} /> */}
            <div className="summoer_menu">
                <UserMenuBar />
            </div>
        </div>
    )
}
