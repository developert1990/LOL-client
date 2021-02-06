import React from 'react'
import { API } from '../../config';
import { GameImageType } from '../../types';

interface RunesCardCardPropsType {
    data: GameImageType;
}
export const ChampImgCard: React.FC<RunesCardCardPropsType> = ({ data }) => {

    const image = data.champImage ? data.champImage : data.championId + ".png";
    return (
        <>
            <img className="champ-image" src={`${API.GET_CHAMPION_SQUARE_IMG}/${image}`} alt="images" />
        </>
    )
}
