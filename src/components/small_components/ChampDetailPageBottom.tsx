import React from 'react'
import { ChampDetailPageTopProps } from './ChampDetailPageTop'
import { ChampSkinsCard } from './ChampSkinsCard'

export const ChampDetailPageBottom: React.FC<ChampDetailPageTopProps> = ({ selectedChampDetails }) => {

    return (
        <div className="champDetailPage__bottom">
            <ChampSkinsCard skins={selectedChampDetails.skins} champ={selectedChampDetails.id} />
        </div>
    )
}
