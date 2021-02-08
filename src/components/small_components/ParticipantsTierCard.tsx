import React from 'react';
import { mixedArrType } from '../../libs';
import { GameImageType } from '../../types';


export interface ParticipantsTierCardPropsType {
    otherParticipants: mixedArrType[];
    index: number;
}

export const ParticipantsTierCard: React.FC<ParticipantsTierCardPropsType> = ({ otherParticipants, index }) => {
    // console.log('data.............................', data)
    return (
        <div className="participantRank">
            {otherParticipants[index].tier}
        </div>
    )
}
