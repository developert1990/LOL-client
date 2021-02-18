import React from 'react'
import { GameImageType } from '../../types'
import { GoldEarnedCard } from './GoldEarnedCard'
import { KDA_Card } from './KDA_Card'
import { MinionKillsCard } from './MinionKillsCard'
import { Rate_Card } from './Rate_Card'


interface GameRecordsCardPropsType {
    data: GameImageType;
}
export const GameRecordsCard: React.FC<GameRecordsCardPropsType> = ({ data }) => {

    return (
        <>
            <GoldEarnedCard data={data} />
            <Rate_Card rate={Number(data.rate)} />
            <KDA_Card data={data} />
            <MinionKillsCard data={data} />
        </>
    )
}
