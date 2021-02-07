import React from 'react'
import { useSelector } from 'react-redux';
import { API } from '../../config';
import { mixedArrType } from '../../libs';
import { initialAppStateType } from '../../store';

interface OtherParticipantsCardPropsType {
    otherParticipants: mixedArrType[];
}

export const OtherParticipantsCard: React.FC<OtherParticipantsCardPropsType> = ({ otherParticipants }) => {

    return (
        <div className="OtherParticipants_Container">
            {
                otherParticipants.map((data, index) => {
                    return (
                        <div className="OtherParticipantsCard" key={index}>
                            <img className="champ-image" src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.championId}.png`} alt="images" />
                            <div className="participantName">{data.playerName}</div>
                        </div>
                    )

                })
            }
        </div>
    )
}
