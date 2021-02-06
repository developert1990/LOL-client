
import React from 'react';
import { API } from '../config';
import { ChampDetailType, GameImageType, MatchedGameType, ParticipantIdentitiesType, ParticipantsType, RuneBigType, SpellDetailType } from '../types';
import darkgery from '../images/darkgrey.png';
import { ChampImgCard, GoldEarnedCard, ItemsCard, KDA_Card, MinionKillsCard, RunesCard, SpellsCard } from './small_components/index';
export interface MatchedGameDetailPropsType {
    games: MatchedGameType;
    clickedData: GameImageType;
    allChampsData: ChampDetailType[];
    allRunesData: RuneBigType[];
    allSpellsData: SpellDetailType[];
}

export const MatchedGameDetail: React.FC<MatchedGameDetailPropsType> = ({ games, clickedData, allChampsData, allRunesData, allSpellsData }) => {

    // const newObj = Object.assign({}, matchesInfo); 이렇게도 객체 깊은 복사를 할 수 있다.(참조를 하는 것이 아니라 새로운 객체를 만들어낸다.), spread operation을 통해서도 가능하다.


    const matchedInformation: MatchedGameType = JSON.parse(JSON.stringify(games)); // Object deep copy
    const { participants, participantIdentities } = matchedInformation;

    const getSummonersInfo = (data: any, index: number) => {
        const { assists, champLevel, deaths, doubleKills, goldEarned, item0, item1, item2, item3, item4, item5, item6, kills, totalMinionsKilled, tripleKills, wardsPlaced } = data.stats;
        let { perkPrimaryStyle, perkSubStyle } = data.stats;

        // 챔피언 이름 뽑는 것
        allChampsData.map((champInfo: ChampDetailType) => {
            if (champInfo.key === data.championId.toString()) {
                data.championId = champInfo.id;
            }
            return data.championId;
        });

        // 유저 아이디 뽑는 것
        participantIdentities.map((identities: ParticipantIdentitiesType) => {
            if (identities.participantId === data.participantId) {
                data.participantId = identities.player.summonerName;
            }
            return data.participantId;
        });

        // 룬 뽑는 것
        allRunesData.map((rune: RuneBigType) => {
            if (rune.id === perkPrimaryStyle) {
                perkPrimaryStyle = rune.icon;
            }
            if (rune.id === perkSubStyle) {
                perkSubStyle = rune.icon;
            }
            return '';
        });

        // 스펠 뽑는 것
        allSpellsData.map((spell: SpellDetailType) => {
            if (data.spell1Id === Number(spell.key)) {
                data.spell1Id = `${spell.id}.png`;
            }
            if (data.spell2Id === Number(spell.key)) {
                data.spell2Id = `${spell.id}.png`;
            }
            return '';
        })


        return (
            <div className="matched-details" key={index}>
                <div key={index} className={data.stats.win ? 'win' : 'lost'}>
                    {index === 0 && <div className="win-defeat1">{data.stats.win ? 'WIN' : 'DEFEAT'}<span className="team">BLUE</span></div>}
                    {index === 5 && <div className="win-defeat2">{data.stats.win ? 'WIN' : 'DEFEAT'}<span className="team">RED</span></div>}

                    {console.log('data ===============', data)}
                    <div className="users-info">
                        <div className="img-level_spells_runes">
                            <ChampImgCard data={data} />
                            <span className="level">{champLevel}</span>
                            <span className="chammpionId">{data.championId}</span>
                            <div className="spells_runes">
                                <SpellsCard data={data} />
                                <RunesCard data={data} perkPrimaryStyle={perkPrimaryStyle} perkSubStyle={perkSubStyle} />
                            </div>
                        </div>
                        <div className="participantRank_id">
                            <div className="participantRank">티어,랭크</div>
                            <div className="id">{data.participantId}</div>
                        </div>
                        <div className="kda_kdaAv">
                            <span>{`${((kills + assists) / deaths).toFixed(2)}` === 'Infinity' ? 'Perfect' : `${((kills + assists) / deaths).toFixed(2)}`}</span>
                            <KDA_Card data={data} />
                        </div>
                        <div className="minion_gold">
                            <MinionKillsCard data={data} totalMinionsKilled={totalMinionsKilled} />
                            <GoldEarnedCard data={data} />
                        </div>
                        <div className="items">
                            <ItemsCard data={data} />
                        </div>
                        {/* http://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/3065.png */}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {
                <div>
                    {participants.map((data: ParticipantsType, index: number) => {

                        switch (data.teamId) {
                            case 100:

                                return (
                                    getSummonersInfo(data, index)
                                );
                            case 200:
                                return (
                                    getSummonersInfo(data, index)
                                );
                            default:
                                return '';
                        }
                    })}
                </div>
            }
        </div>
    )
}
