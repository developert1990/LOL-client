import React from 'react'
import { API } from '../../config'
import { ChampionSkinsType } from '../../types'

interface ChampSkinsCardProps {
    skins: ChampionSkinsType[];
    champ: string;
}
export const ChampSkinsCard: React.FC<ChampSkinsCardProps> = ({ skins, champ }) => {
    console.log('skins', skins)
    return (
        <div className="ChampSkinsCard">
            {
                skins.map((skin, index) => {
                    return (
                        <div className="skin_sell" key={index}>
                            <div className="champSkin_img">
                                <img className="champ-skin" src={`${API.GET_SKINS}/${champ}_${skin.num}.jpg`} alt={`${skin.name}`} />
                            </div>
                            <span>{skin.name === "default" ? champ : skin.name}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}
