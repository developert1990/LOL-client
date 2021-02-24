import React from 'react'
import { SummonerDetailType } from '../../types'

interface SummonerDetailCardPopsType {
    summonerDetail: SummonerDetailType;
}

export const SummonerDetailCard: React.FC<SummonerDetailCardPopsType> = ({ summonerDetail }) => {
    return (
        <div className="detail-info custom_card">
            <div className="detail_title">Rank</div>
            <div className="detail-parent">
                <img className="emblem-img" src={require(`../../images/ranked-emblems/${summonerDetail.tier}.png`).default} alt="tier-emblem" />

                <div className="detail">
                    <span className="queue-type">{summonerDetail.queueType}</span>
                    <div className="tier-lp">
                        <span className="tier">{summonerDetail.tier} <span className="rank">{summonerDetail.rank}</span> </span>
                        <span className="lp"> / {summonerDetail.leaguePoints} LP</span>
                    </div>
                    <span className="win-lost">{`${summonerDetail.wins} W ${summonerDetail.losses} L`}</span>
                    <div className="winRate-totalGame">
                        <span className="winRate">{`${Math.round(summonerDetail.wins / (summonerDetail.wins + summonerDetail.losses) * 100)}%`}</span>
                        <span className="totalGame">{summonerDetail.wins + summonerDetail.losses} games</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
