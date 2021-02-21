import React from 'react'
import { API } from '../../config';

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
        <div className="ChampImgCard">
            <img className="champ-image" src={`${API.GET_CHAMPION_SQUARE_IMG}/${checkImage(data)}`} alt="images" />
        </div>
    )
}
