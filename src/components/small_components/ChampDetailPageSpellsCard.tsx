import React from 'react'
import { ChampionInnerPassiveType, ChampionSpellsType } from '../../types';
import { ChampSpellCard } from './ChampSpellCard';
import { API } from '../../config'

interface ChampDetailPageSpellsCardProps {
    spells: ChampionSpellsType[];
    passive: ChampionInnerPassiveType;
}
export const ChampDetailPageSpellsCard: React.FC<ChampDetailPageSpellsCardProps> = ({ spells, passive }) => {
    return (
        <>
            <div className="passive">
                <ChampSpellCard data={passive} URL={API.GET_PASSIVE_IMG} />
            </div>
            {
                spells.map((spell, index) => {
                    return (
                        <div className="spell" key={index}>
                            <ChampSpellCard data={spell} URL={API.GET_SPELLS_IMG} />
                        </div>
                    )
                })
            }
        </>
    )
}
