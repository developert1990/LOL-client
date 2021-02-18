import React from 'react'
import { API } from '../../config';
import { GameImageType, MasteriesType } from '../../types';

interface RunesCardCardPropsType {
    data: any;
}
export const ChampImgCard: React.FC<RunesCardCardPropsType> = ({ data }) => {

    const image = data.champImage ? data.champImage : data.championId + ".png";
    return (
        <>
            <img className="champ-image" src={`${API.GET_CHAMPION_SQUARE_IMG}/${image}`} alt="images" />
        </>
    )
}
