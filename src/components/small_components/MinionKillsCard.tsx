import React from 'react';
import { GameImageType } from '../../types';

interface GameRecordsCardPropsType {
    data: GameImageType;
    totalMinionsKilled?: any;
}
export const MinionKillsCard: React.FC<GameRecordsCardPropsType> = ({ data, totalMinionsKilled }) => {
    const minionKills = data?.minionKillded ? data?.minionKillded : totalMinionsKilled;
    return (
        <span className="cs">{minionKills} ({`${(minionKills / 60).toFixed(1)}`}) CS</span>
    )
}
