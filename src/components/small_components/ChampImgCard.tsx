import React from 'react'
import { API } from '../../config';
import { GameImageType } from '../../types';

interface RunesCardCardPropsType {
    data: GameImageType;
}
export const ChampImgCard: React.FC<RunesCardCardPropsType> = ({ data }) => {
    return (
        <>
            <img className="champ-image" src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.champImage}`} alt="images" />
        </>
    )
}
