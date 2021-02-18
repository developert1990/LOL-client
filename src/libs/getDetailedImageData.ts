import { getRunesData } from './getRunesData';
import { getSpellsData } from './getSpellsData';
import { getChampsData } from './getChampsData';

import { SpellsIngameType, RunesIngameType, ParticipantsType, GameImageType, MatchedGameType, ChampDetailType, SpellDetailType, RuneBigType } from './../types.d';
import { getMatchHistory } from '../constants/constants';

// 성공
export const getDetailedImageData = (summonerDetail: ParticipantsType[], matchesInfo: MatchedGameType[]) => {
    const spellsArr: SpellsIngameType[] = [];
    const runesArr: RunesIngameType[] = [];
    const champImages: GameImageType[] = [];
    const information: GameImageType[] = [];

    const allChampsData = getChampsData();
    const allSpellsData = getSpellsData();
    const allRunesData = getRunesData();
    for (let i = 0; i < getMatchHistory; i++) {
        const spell1: any = summonerDetail[i].spell1Id;
        const spell2: any = summonerDetail[i].spell2Id;
        spellsArr.push({
            spell1,
            spell2,
        });
    }


    for (let i = 0; i < getMatchHistory; i++) {
        const primaryRune: any = summonerDetail[i].stats.perkPrimaryStyle;
        const subRune: any = summonerDetail[i].stats.perkSubStyle;
        runesArr.push({
            primaryRune,
            subRune,
        })
    };


    // // 해당하는 룬 뽑는 함수
    const usedRunes: any[] = runesArr.map(rune => {
        const obj: any = {};
        for (const [key, value] of Object.entries(rune)) {
            obj[key] = allRunesData.find(data => data.id === value)?.icon
        }
        return obj
    });


    // // 해당하는 스펠 뽑는 함수
    const usedSpells: any[] = spellsArr.map(spell => {
        const obj: any = {}
        for (const [key, value] of Object.entries(spell)) {
            obj[key] = allSpellsData.find(data => Number(data.key) === value)?.id;
        }
        return obj
    });


    for (let j = 0; j < getMatchHistory; j++) {
        for (let i = 0; i < 150; i++) {
            if (Number(allChampsData[i].key) === summonerDetail[j].championId) {
                champImages.push(
                    {
                        createdGame: matchesInfo[j].gameCreation,
                        gameDuration: matchesInfo[j].gameDuration,
                        teams: matchesInfo[j].teams,
                        gameId: matchesInfo[j].gameId,
                        champImage: allChampsData[i].image.full,
                        item0: summonerDetail[j].stats.item0,
                        item1: summonerDetail[j].stats.item1,
                        item2: summonerDetail[j].stats.item2,
                        item3: summonerDetail[j].stats.item3,
                        item4: summonerDetail[j].stats.item4,
                        item5: summonerDetail[j].stats.item5,
                        item6: summonerDetail[j].stats.item6,
                        spell1: usedSpells[j].spell1,
                        spell2: usedSpells[j].spell2,
                        gold: summonerDetail[j].stats.goldEarned,
                        ward: summonerDetail[j].stats.wardsPlaced,
                        kills: summonerDetail[j].stats.kills,
                        assists: summonerDetail[j].stats.assists,
                        deaths: summonerDetail[j].stats.deaths,
                        minionKillded: summonerDetail[j].stats.totalMinionsKilled,
                        rate: ((summonerDetail[j].stats.kills + summonerDetail[j].stats.assists) / summonerDetail[j].stats.deaths).toFixed(2),
                        gameResult: summonerDetail[j].stats.win ? 'Victory' : 'Defeat',
                        level: summonerDetail[j].stats.champLevel,
                        mainRune: usedRunes[j].primaryRune,
                        subRune: usedRunes[j].subRune,
                        otherParticipants: summonerDetail[j].otherParticipants,
                    }
                )
            }
        }
    }

    const newData = information.concat(champImages);
    return newData;
}