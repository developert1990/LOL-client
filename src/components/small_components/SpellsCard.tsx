import React from 'react'
import { API } from '../../config'
import { GameImageType } from '../../types'

interface SpellsCardCardPropsType {
    data: GameImageType;
}
export const SpellsCard: React.FC<SpellsCardCardPropsType> = ({ data }) => {

    const spell_1 = data.spell1 ? data.spell1 : data.spell1Id?.split('.')[0];
    const spell_2 = data.spell2 ? data.spell2 : data.spell2Id?.split('.')[0];

    return (
        <div className="spells">
            <span><img className="spell" src={`${API.GET_SPELLS_IMG}/${spell_1}.png`} alt="images" /></span>
            <span><img className="spell" src={`${API.GET_SPELLS_IMG}/${spell_2}.png`} alt="images" /></span>
        </div>
    )
}
