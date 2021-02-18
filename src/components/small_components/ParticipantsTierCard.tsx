import React from 'react';
import { API } from '../../config';
import { mixedArrType } from '../../libs';
import { GameImageType } from '../../types';


export interface ParticipantsTierCardPropsType {
    otherParticipants: mixedArrType[];
    index: number;
}

export const ParticipantsTierCard: React.FC<ParticipantsTierCardPropsType> = ({ otherParticipants, index }) => {

    const getInitialTier = () => {
        switch (otherParticipants[index].tier) {
            case "CHALLENGER":
                return "C";
            case "GRANDMASTER":
                return "GM";
            case "MASTER":
                return "M";
            case "DIAMOND":
                return "D";
            case "PLATINUM":
                return "P";
            case "GOLD":
                return "G";
            case "SILVER":
                return "S";
            case "BRONZE":
                return "B";
            case "IRON":
                return "IR";
            case "UNRANK":
                return "UR";
            default:
                return "N/A";
        }
    }

    const tier = otherParticipants[index].tier;
    return (
        <div className="participantRank">
            <img style={{ width: "35px", height: "35px" }} className="emblem-img" src={require(`../../images/ranked-emblems/${tier}.png`).default} alt="tier-emblem" />
            <div className={`initialTier ${getInitialTier()}`}>{getInitialTier()}</div>
        </div>
    )
}
