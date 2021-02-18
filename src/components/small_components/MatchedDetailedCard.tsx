import React from 'react';
import { useSelector } from 'react-redux';
import { initialAppStateType } from '../../store';
import { ChampDetailType, GameImageType, ParticipantIdentitiesType, RuneBigType, SpellDetailType } from '../../types';
import { ChampImgCard, GoldEarnedCard, ItemsCard, KDA_Card, MinionKillsCard, ParticipantsTierCard, Rate_Card, RunesCard, SpellsCard } from './index';

interface MatchedDetailedCardPropsType {
    participantsInfo: any;
    clickedData: GameImageType;
    participantIdentities: ParticipantIdentitiesType[];
    index: number;
    allChampsData: ChampDetailType[];
    allRunesData: RuneBigType[];
    allSpellsData: SpellDetailType[];
}

export const MatchedDetailedCard: React.FC<MatchedDetailedCardPropsType> = ({ participantsInfo, clickedData, participantIdentities, index, allChampsData, allRunesData, allSpellsData }) => {
    const { assists, champLevel, deaths, doubleKills, goldEarned, item0, item1, item2, item3, item4, item5, item6, kills, totalMinionsKilled, tripleKills, wardsPlaced } = participantsInfo.stats;
    let { perkPrimaryStyle, perkSubStyle } = participantsInfo.stats;

    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { summonerInfo } = getSummonerStore;
    // const isSearchedUser = participantsInfo.participantId === summonerInfo && summonerInfo?.name ? "sameUser" : "notSame";

    const { otherParticipants } = clickedData;

    // 챔피언 이름 뽑는 것
    allChampsData.map((champInfo: ChampDetailType) => {
        if (champInfo.key === participantsInfo.championId.toString()) {
            participantsInfo.championId = champInfo.id;
        }
        return participantsInfo.championId;
    });

    // 유저 아이디 뽑는 것
    participantIdentities.map((identities: ParticipantIdentitiesType) => {
        if (identities.participantId === participantsInfo.participantId) {
            participantsInfo.participantId = identities.player.summonerName;
        }
        return participantsInfo.participantId;
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
        if (participantsInfo.spell1Id === Number(spell.key)) {
            participantsInfo.spell1Id = `${spell.id}.png`;
        }
        if (participantsInfo.spell2Id === Number(spell.key)) {
            participantsInfo.spell2Id = `${spell.id}.png`;
        }
        return '';
    })


    return (
        <div className={`matched-details`} key={participantIdentities[index].participantId + new Date().getMilliseconds()}>


            <div key={participantIdentities[index].participantId + new Date().getMilliseconds()} className={`${participantsInfo.stats.win ? 'won' : 'lost'} ${participantsInfo.participantId === summonerInfo?.name ? "sameUser" : "notSame"}`}>
                {index === 0 && <div className="win-defeat1">{participantsInfo.stats.win ? 'WIN' : 'DEFEAT'}<span className="team"> (Blue Team)</span></div>}
                {index === 5 && <div className="win-defeat2">{participantsInfo.stats.win ? 'WIN' : 'DEFEAT'}<span className="team"> (Red Team)</span></div>}
                <div className="users-info">
                    <div className="img-level_spells_runes">
                        <ChampImgCard data={participantsInfo} />
                        <span className="level">{champLevel}</span>
                        <span className="chammpionId">{participantsInfo.championId}</span>
                        <div className="spells_runes">
                            <SpellsCard data={participantsInfo} />
                            <RunesCard data={participantsInfo} perkPrimaryStyle={perkPrimaryStyle} perkSubStyle={perkSubStyle} />
                        </div>
                    </div>
                    <div className="participantRank_id">
                        <ParticipantsTierCard otherParticipants={otherParticipants} index={index} />
                        <div className="id">{participantsInfo.participantId}</div>
                    </div>
                    <div className="kda_kdaAv">
                        <Rate_Card kills={kills} assists={assists} deaths={deaths} />
                        <KDA_Card data={participantsInfo} />
                    </div>
                    <div className="minion_gold">
                        <MinionKillsCard data={participantsInfo} totalMinionsKilled={totalMinionsKilled} />
                        <GoldEarnedCard data={participantsInfo} />
                    </div>
                    <div className="items">
                        <ItemsCard data={participantsInfo} />
                    </div>
                    {/* http://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/3065.png */}
                </div>
            </div>
        </div>
    )
}


