import React from 'react';
import { Button } from 'react-bootstrap';
import { API } from '../../config';
import { SummonerReduxtype } from '../../types';

interface SummonerProfileCardPropsType {
    summonerInfo: SummonerReduxtype | undefined;
}
export const SummonerProfileCard: React.FC<SummonerProfileCardPropsType> = ({ summonerInfo }) => {
    return (
        <div className="summoner_profile">
            <div className="level_img">
                <span className="level">{summonerInfo?.summonerLevel}</span>
                <img className="logo-img" src={`${API.GET_PROFILEICON}/${summonerInfo?.profileIconId}.png`} alt="profileIcon" />
            </div>
            <div>
                <div className="name">{summonerInfo?.name}</div>
                <Button >Update</Button>
            </div>
        </div>
    )
}
