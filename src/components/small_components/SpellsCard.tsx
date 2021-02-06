import React from 'react'
import { API } from '../../config'
import { GameImageType } from '../../types'

interface SpellsCardCardPropsType {
    data: GameImageType;
}
export const SpellsCard: React.FC<SpellsCardCardPropsType> = ({ data }) => {
    return (
        <div className="spells">
            <span><img className="spell" src={`${API.GET_SPELLS_IMG}/${data.spell1}.png`} alt="images" /></span>
            <span><img className="spell" src={`${API.GET_SPELLS_IMG}/${data.spell2}.png`} alt="images" /></span>
        </div>
    )
}
