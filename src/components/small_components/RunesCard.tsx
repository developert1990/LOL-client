import React from 'react'
import { API } from '../../config'
import { GameImageType } from '../../types'

interface RunesCardPropsType {
    data: GameImageType;
    perkPrimaryStyle?: string;
    perkSubStyle?: string;
}
export const RunesCard: React.FC<RunesCardPropsType> = ({ data, perkPrimaryStyle, perkSubStyle }) => {

    const mainRune = data.mainRune ? data.mainRune : perkPrimaryStyle;
    const subRune = data.subRune ? data.subRune : perkSubStyle;
    return (
        <div className="runes">
            <span><img className="rune" src={`${API.GET_RUNES_IMG}/${mainRune}`} alt="images" /></span>
            <span><img className="rune" src={`${API.GET_RUNES_IMG}/${subRune}`} alt="images" /></span>
        </div>
    )
}
