import React from 'react'
import { GameImageType } from '../../types'
import { GoldEarnedCard } from './GoldEarnedCard'
import { KDA_Card } from './KDA_Card'
import { MinionKillsCard } from './MinionKillsCard'


interface GameRecordsCardPropsType {
    data: GameImageType;
}
export const GameRecordsCard: React.FC<GameRecordsCardPropsType> = ({ data }) => {
    return (
        <>
            <GoldEarnedCard data={data} />
            <span className="rate">{data.rate}</span>
            <KDA_Card data={data} />
            <MinionKillsCard data={data} />
        </>
    )
}
