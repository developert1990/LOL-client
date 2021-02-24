import React from 'react'
import { ChampDetailPageTopProps } from './ChampDetailPageTop'

export const ChampDetailPageMiddle: React.FC<ChampDetailPageTopProps> = ({ selectedChampDetails }) => {
    console.log('selectedChampDetails', selectedChampDetails);
    const { armor, crit, hp, attackdamage, attackspeed, movespeed, mp, spellblock, armorperlevel, attackdamageperlevel, attackrange, attackspeedperlevel, critperlevel, hpperlevel, hpregen, hpregenperlevel, mpperlevel, mpregen, mpregenperlevel, spellblockperlevel } = selectedChampDetails.stats;
    return (
        <div className="champDetailPage__middle">
            <div className="top">
                {selectedChampDetails.blurb}
            </div>
            <div className="bottom">
                <div className="abilities">
                    <div className="ability_sell armor">
                        <span className="ability_point _armor">{armor}</span>
                        <span>Armor</span>
                    </div>

                    <div className="ability_sell crit">
                        <span className="ability_point">{crit}</span>
                        <span>Crit</span>
                    </div>

                    <div className="ability_sell hp">
                        <span className="ability_point _hp">{hp}</span>
                        <span>HP</span>
                    </div>

                    <div className="ability_sell mp">
                        <span className="ability_point _mp">{mp}</span>
                        <span>MP</span>
                    </div>

                    <div className="ability_sell attackdamage">
                        <span className="ability_point">{attackdamage}</span>
                        <span>Attackdamage</span>
                    </div>

                    <div className="ability_sell attackspeed">
                        <span className="ability_point">{attackspeed}</span>
                        <span>Attackspeed</span>
                    </div>

                    <div className="ability_sell movespeed">
                        <span className="ability_point">{movespeed}</span>
                        <span>Movespeed</span>
                    </div>

                    <div className="ability_sell spellblock">
                        <span className="ability_point">{spellblock}</span>
                        <span>Spellblock</span>
                    </div>


                </div>
            </div>
        </div>
    )
}
