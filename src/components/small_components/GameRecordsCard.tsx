import React from 'react'
import { GameImageType } from '../../types'


interface GameRecordsCardPropsType {
    data: GameImageType;
}
export const GameRecordsCard: React.FC<GameRecordsCardPropsType> = ({ data }) => {
    return (
        <>
            <span className="gold">{data.gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} G</span> {/* 골드 세칸당 콤마(,) 찍는 함수 */}
            <span className="rate">{data.rate}</span>
            <div className="kda">
                <span className="kills">{data.kills}</span> / <span className="deaths">{data.deaths}</span> / <span className="assists">{data.deaths}</span>
            </div>
            <span className="cs">{data.minionKillded} ({`${(data.minionKillded / 60).toFixed(1)}`}) CS</span>
        </>
    )
}
