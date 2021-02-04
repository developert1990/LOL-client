import { getRunesData } from './getRunesData';
import { getSpellsData } from './getSpellsData';
import { getChampsData } from './getChampsData';


import { SpellsIngameType, RunesIngameType, ParticipantsType, GameImageType, MatchedGameType, ChampDetailType, SpellDetailType, RuneBigType } from './../types.d';


export const getDetailedImageData = (summonerDetail: ParticipantsType[], matchesInfo: MatchedGameType[]) => {
    const spellsArr: SpellsIngameType[] = [];
    const runesArr: RunesIngameType[] = [];
    const champImages: GameImageType[] = [];
    const information: GameImageType[] = [];


    const allChampsData = getChampsData();
    const allSpellsData = getSpellsData();
    const allRunesData = getRunesData();

    // if (matchesInfo && summonerDetail.length > 0) {
    console.log('룬, 스펠, 챔프 뽑음. ')
    // console.log('룬, 스펠, 챔프 뽑으러 if 문안에 들어옴')
    console.log(allChampsData);
    console.log(allRunesData);
    console.log(allSpellsData)

    for (let i = 0; i < 3; i++) {
        const spell1: any = summonerDetail[i].spell1Id;
        const spell2: any = summonerDetail[i].spell2Id;
        spellsArr.push({
            spell1,
            spell2,
        });
    }

    console.log(allSpellsData);
    console.log(spellsArr);

    for (let i = 0; i < 3; i++) {
        const primaryRune: any = summonerDetail[i].stats.perkPrimaryStyle;
        const subRune: any = summonerDetail[i].stats.perkSubStyle;
        runesArr.push({
            primaryRune,
            subRune,
        })
    };
    console.log("룬어레이~~~~", runesArr);
    console.log("allRunesData~~~~", allRunesData);
    // // 해당하는 룬 뽑는 함수
    const usedRunes: any[] = runesArr.map(rune => {
        // console.log('Object.entries(rune) ==> ', Object.entries(rune))
        const obj: any = {};
        for (const [key, value] of Object.entries(rune)) {
            obj[key] = allRunesData.find(data => data.id === value)?.icon
        }
        return obj
    });
    console.log("뽑은 룬 스트링이라야한다....", usedRunes);

    // // 해당하는 스펠 뽑는 함수
    // console.log(spellsArr)
    const usedSpells: any[] = spellsArr.map(spell => {
        // console.log(Object.entries(spell));
        const obj: any = {}
        for (const [key, value] of Object.entries(spell)) {
            obj[key] = allSpellsData.find(data => Number(data.key) === value)?.id;
        }
        // console.log(obj)
        return obj
    });
    console.log("뽑은 스펠 스트링이라야한다....", usedSpells);

    // console.log(matchesInfo);

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 150; i++) {
            if (Number(allChampsData[i].key) === summonerDetail[j].championId) {
                // console.log('같은거 있음')
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

                    }
                )
            }
        }
    }
    const newData = information.concat(champImages);
    console.log('newData: ', newData)
    return newData;
    // setInformation(newData);
    // setPageLoading(false);
    // setLoadMore(false) // 로드하는 버튼 누르면 로딩이 시작되기 때문에 데이터를 다 로드하면 false로 해서 로딩 컴포넌트가 종료되고 다시 버튼이 뜬다.
    // console.log(champImages);

    // setLoaded(false);
    // }
}