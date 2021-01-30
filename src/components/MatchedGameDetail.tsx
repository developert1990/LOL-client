
import React, { SyntheticEvent } from 'react';
import { API } from '../config';
import { ChampDetailType, GameImageType, MatchedGameType, ParticipantIdentitiesType, ParticipantsType, RuneBigType, SpellDetailType } from '../types';
import darkgery from '../images/darkgrey.png';
export interface MatchedGameDetailPropsType {
    matchesInfo: MatchedGameType;
    clickedData: GameImageType;
    allChampsData: ChampDetailType[];
    allRunesData: RuneBigType[];
    allSpellsData: SpellDetailType[];
}

export const MatchedGameDetail: React.FC<MatchedGameDetailPropsType> = ({ matchesInfo, clickedData, allChampsData, allRunesData, allSpellsData }) => {

    // const newObj = Object.assign({}, matchesInfo); 이렇게도 객체 깊은 복사를 할 수 있다.(참조를 하는 것이 아니라 새로운 객체를 만들어낸다.), spread operation을 통해서도 가능하다.

    const matchedInformation: MatchedGameType = JSON.parse(JSON.stringify(matchesInfo)); // Object deep copy
    const { participants, participantIdentities } = matchedInformation;


    const getSummonersInfo = (data: ParticipantsType, index: number) => {
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
                    {/* <span>Champ ID: {data.championId}</span> */}
                    <div className="users-info">
                        <div className="first-part">
                            <div className="img-level">
                                <img src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.championId}.png`} alt="images" />
                                <span className="level">{champLevel}</span>
                            </div>
                            <div className="spells-runes">
                                <div className="spells">
                                    <img src={`${API.GET_SPELLS_IMG}/${data.spell1Id}`} alt="images" />
                                    <img src={`${API.GET_SPELLS_IMG}/${data.spell2Id}`} alt="images" />
                                </div>
                                <div className="runes">
                                    <img src={`${API.GET_RUNES_IMG}/${perkPrimaryStyle}`} alt="images" />
                                    <img src={`${API.GET_RUNES_IMG}/${perkSubStyle}`} alt="images" />
                                </div>
                            </div>
                            <span className="id">{data.participantId}</span>
                        </div>

                        {/* <span> 승패: {data.stats.win ? 'WIN' : 'DEFEAT'}</span> */}
                        <div className="second-part">
                            {/* <div>{data.stats}</div> */}
                            <span>{`${((kills + assists) / deaths).toFixed(2)}` === 'Infinity' ? 'Perfect' : `${((kills + assists) / deaths).toFixed(2)}`}</span>
                            <div className="kda">
                                <span className="kills">{kills}</span> / <span className="deaths">{deaths}</span> / <span className="assists">{assists}</span>
                            </div>
                        </div>
                        <div className="third-part">
                            <span className="cs">{totalMinionsKilled} ({(totalMinionsKilled / 60).toFixed(1)}) CS</span>
                            <span className="gold">{goldEarned.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} G</span> {/* 숫자에 콤마(,) 찍는 함수 */}
                        </div>
                        <div className="forth-part">
                            {item0 === 0 ? <img src={darkgery} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item0}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" />}
                            {item1 === 0 ? <img src={darkgery} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item1}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" />}
                            {item2 === 0 ? <img src={darkgery} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item2}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" />}
                            {item3 === 0 ? <img src={darkgery} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item3}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" />}
                            {item4 === 0 ? <img src={darkgery} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item4}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" />}
                            {item5 === 0 ? <img src={darkgery} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item5}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" />}
                            {item6 === 0 ? <img src={darkgery} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item6}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" />}
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
