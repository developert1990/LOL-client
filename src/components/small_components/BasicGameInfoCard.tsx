import React from 'react';
import { getPlayGameDate, getPlayDuration } from '../../libs/index';
import { GameImageType } from '../../types';

interface BasicGameInfoCardPropsType {
    data: GameImageType;
}
export const BasicGameInfoCard: React.FC<BasicGameInfoCardPropsType> = ({ data }) => {
    return (
        <>
            <span className="created-game">{getPlayGameDate(data.createdGame)}</span>
            <span className="game-duration">{getPlayDuration(data.gameDuration)}</span>
            <span className={`game-result ${data.gameResult === "Victory" ? 'win_text' : 'lose_text'}`}>{data.gameResult}</span>
        </>
    )
}
