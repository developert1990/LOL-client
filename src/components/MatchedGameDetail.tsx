
import React from 'react';
import { API } from '../config';
import { ChampDetailType, GameImageType, MatchedGameType, ParticipantIdentitiesType, ParticipantsType, RuneBigType, SpellDetailType } from '../types';
import darkgery from '../images/darkgrey.png';
import { ChampImgCard, GoldEarnedCard, ItemsCard, KDA_Card, MatchedDetailedCard, MinionKillsCard, ParticipantsTierCard, RunesCard, SpellsCard } from './small_components/index';

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


    return (
        <div>
            {participants.map((participantsInfo: ParticipantsType, index: number) => {

                switch (participantsInfo.teamId) {
                    case 100:

                        return (
                            <>
                                <MatchedDetailedCard clickedData={clickedData} participantsInfo={participantsInfo} participantIdentities={participantIdentities} index={index} allChampsData={allChampsData} allRunesData={allRunesData} allSpellsData={allSpellsData} />
                            </>
                        );
                    case 200:
                        return (
                            <>
                                <MatchedDetailedCard clickedData={clickedData} participantsInfo={participantsInfo} participantIdentities={participantIdentities} index={index} allChampsData={allChampsData} allRunesData={allRunesData} allSpellsData={allSpellsData} />
                            </>
                        );
                    default:
                        return '';
                }
            })}
        </div>
    )
}
