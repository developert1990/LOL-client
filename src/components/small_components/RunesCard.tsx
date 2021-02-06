import React from 'react'
import { API } from '../../config'
import { GameImageType } from '../../types'

interface RunesCardCardPropsType {
    data: GameImageType;
}
export const RunesCard: React.FC<RunesCardCardPropsType> = ({ data }) => {
    return (
        <div className="runes">
            <span><img className="rune" src={`${API.GET_RUNES_IMG}/${data.mainRune}`} alt="images" /></span>
            <span><img className="rune" src={`${API.GET_RUNES_IMG}/${data.subRune}`} alt="images" /></span>
        </div>
    )
}
