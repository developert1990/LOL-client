import React from 'react'
import { API } from '../../config';
import { GameImageType, MasteriesType } from '../../types';

interface RunesCardCardPropsType {
    data: any;
}
export const ChampImgCard: React.FC<RunesCardCardPropsType> = ({ data }) => {
    const checkImage = (data: any) => {
        if (data.champImage) {
            return data.champImage;
        } else if (data.id) {
            return `${data.id}.png`
        } else {
            return `${data.championId}.png`
        }
    }

    return (
        <>
            <img className="champ-image" src={`${API.GET_CHAMPION_SQUARE_IMG}/${checkImage(data)}`} alt="images" />
        </>
    )
}
