import React from 'react'
import { ChampDetailPageTopProps } from './ChampDetailPageTop'

export const ChampDetailPageMiddle: React.FC<ChampDetailPageTopProps> = ({ selectedChampDetails }) => {
    console.log('selectedChampDetails', selectedChampDetails);
    const { armor, crit, hp, attackdamage, attackspeed, movespeed, mp, spellblock, armorperlevel, attackdamageperlevel, attackrange, attackspeedperlevel, critperlevel, hpperlevel, hpregen, hpregenperlevel, mpperlevel, mpregen, mpregenperlevel, spellblockperlevel } = selectedChampDetails.stats;
    return (
        <div className="champDetailPage__middle">
            <div className="left">
                {selectedChampDetails.blurb}
            </div>
            <div className="right">
                <table className="rank-table">
                    <thead>
                        <tr>
                            <th>armor</th>
                            <th>crit</th>
                            <th>hp</th>
                            <th>mp</th>
                            <th>attackdamage</th>
                            <th>attackspeed</th>
                            <th>movespeed</th>
                            <th>spellblock</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>{armor}</td>
                            <td>{crit}</td>
                            <td className="tier">{hp}</td>
                            <td>{mp}</td>
                            <td className="wins">{attackdamage}</td>
                            <td className="losses">{attackspeed}</td>
                            <td className="rates" >{movespeed}</td>
                            <td>{spellblock}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
