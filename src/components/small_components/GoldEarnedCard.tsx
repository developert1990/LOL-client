import React from 'react'
import { GameImageType } from '../../types'

interface GameRecordsCardPropsType {
    data: GameImageType;
}
export const GoldEarnedCard: React.FC<GameRecordsCardPropsType> = ({ data }) => {
    const gold = data.stats ? data.stats.goldEarned : data.gold;
    return (
        // 골드 세칸당 콤마(,) 찍는 함수
        <span className="gold">{gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} G</span>

    )
}
