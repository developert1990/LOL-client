import React from 'react';
import { GameImageType } from '../../types';


interface KDA_CardPropsType {
    data: GameImageType;
}
export const KDA_Card: React.FC<KDA_CardPropsType> = ({ data }) => {
    const kills = data.stats ? data.stats.kills : data.kills;
    const deaths = data.stats ? data.stats.deaths : data.deaths;
    return (
        <div className="kda">
            <span className="kills">{kills}</span> / <span className="deaths">{deaths}</span> / <span className="assists">{deaths}</span>
        </div>
    )
}
