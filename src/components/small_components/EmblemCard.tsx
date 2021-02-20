import React from 'react';

interface getEmblemCardPropsType {
    tier: string;
}

export const EmblemCard: React.FC<getEmblemCardPropsType> = ({ tier }) => {
    return (
        <img style={{ width: "35px", height: "35px" }} className="emblem-img" src={require(`../../images/ranked-emblems/${tier}.png`).default} alt="tier-emblem" />
    )
}
