


import React, { Dispatch, SetStateAction, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { API, TEST_BASE } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { Accordion, Card, Button } from 'react-bootstrap';
import { MatchedGameDetail } from './MatchedGameDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loading } from './Loading';
import { initialAppStateType } from '../store';
import { ChampDetailType, GameImageType, MatchedGameType, ParticipantsStatsType, ParticipantsType, RuneBigType, RunesIngameType, SpellDetailType, SpellsIngameType } from '../types';
import darkgery from '../images/darkgrey.png';
import { getPlayGameDate, getPlayDuration } from '../libs/index';
import { useChampsData, useRunesData, useSpellsData } from '../hooks/index';
import { getGameDetail } from '../actions/getGameDetailAction';
export interface LocationType {
    gameIdInfo: number[];
    accountId: string;
    id: string;
}

export interface SpellsStringType {
    spell1: string;
    spell2: string;
}

export interface UserMatchHistoryPropsType {
    gameIdInfo: number[];
    accountId: string;
    id: string;


}




export const UserMatchHistory: React.FC<UserMatchHistoryPropsType> = ({ accountId, gameIdInfo, id }) => {
    console.log("유즈메치히스토리 렌더 하러 들어옴")
    const regionStore = useSelector((state: initialAppStateType) => state.regionStore);
    const { region } = regionStore;

    // 이거 챔피언 json받는데 사용됨
    const { isLoading } = useSelector((state: initialAppStateType) => state.champsStore);

    const getGamesDetailStore = useSelector((state: initialAppStateType) => state.getGameDetailStore);
    const { error, games, isLoading: gamesDetailLoading } = getGamesDetailStore;

    const [pageLoading, setPageLoading] = useState(true);

    // const [matchesInfo, setMatchesInfo] = useState<MatchedGameType[]>([]);

    const matchesData: MatchedGameType[] = [];
    const [summonerDetail, setSummonerDetail] = useState<ParticipantsType[]>([]);
    // const [matchesInfo, setMatchesInfo] = useState<MatchedGameType[]>([]);
    const matchesInfo: MatchedGameType[] = []

    // 커스텀 훅 사용해서 chams, spells, runes 정보 받아옴
    const allChampsData = useChampsData();
    const allSpellsData = useSpellsData();
    const allRunesData = useRunesData();


    const champImages: GameImageType[] = [];
    const spellsArr: SpellsIngameType[] = [];
    const runesArr: RunesIngameType[] = [];
    const [information, setInformation] = useState<GameImageType[]>([]);

    const [start, setStart] = useState(0);
    const [loadMore, setLoadMore] = useState(false);


    const dispatch = useDispatch();

    useEffect(() => {
        console.log("디스패치 들어옴")
        dispatch(getGameDetail(start, gameIdInfo, region, accountId));
    }, [start])

    // useEffect(() => {
    //     if (games) {
    //         games.map((data) => {
    //             matchesInfo.push(data);
    //         })
    //     }
    // }, [games])
    // useEffect(() => {
    //     (
    //         async () => {
    //             console.log('gameId 쭉 뽑은걸로 matchList 3개 뽑으러 들어옴');
    //             for (let i = start; i < start + 3; i++) {
    //                 try {
    //                     const response = await fetch(`${TEST_BASE}/summonorById/proxy/${gameIdInfo[i]}/${region}/matchList`);
    //                     const data = await response.json();
    //                     matchesData.push(data);
    //                 } catch (error) {
    //                     return;
    //                 }

    //             }
    //             setMatchesInfo(matchesData);
    //         }

    //     )();
    // }, [start]);



    // useEffect(() => {
    //     // if (loaded) {
    //     console.log('loaded 되서 들어옴  4');
    //     if (matchesInfo) {
    //         const participantId = matchesInfo.map((data) => data.participantIdentities.filter((data) => data.player.accountId === accountId)[0].participantId);
    //         console.log("participantId ==>> ", participantId);
    //         const summonorMatchDetail = matchesInfo.map((data, index) => data.participants.filter((data) => data.stats.participantId === participantId[index])[0])
    //         console.log("매치 디테일: ", summonorMatchDetail);
    //         setSummonerDetail(summonorMatchDetail);

    //         const playResult = summonorMatchDetail.map((data) => data.stats.win)
    //         // console.log(playResult);
    //     }
    //     // }
    // }, [matchesInfo, accountId])
    // const { gameDuration, gameMode, participantIdentities, participants, teams } = matchesInfo;



    // useEffect(() => {

    //     if (!isLoading && matchesInfo && summonerDetail.length > 0) {
    //         console.log('룬, 스펠, 챔프 뽑음. ')
    //         // console.log('룬, 스펠, 챔프 뽑으러 if 문안에 들어옴')
    //         // console.log(allChampsData);
    //         // console.log(allRunesData);

    //         for (let i = 0; i < 3; i++) {
    //             const spell1: any = summonerDetail[i].spell1Id;
    //             const spell2: any = summonerDetail[i].spell2Id;
    //             spellsArr.push({
    //                 spell1,
    //                 spell2,
    //             });
    //         }

    //         // console.log(allSpellsData);
    //         // console.log(spellsArr);

    //         for (let i = 0; i < 3; i++) {
    //             const primaryRune: any = summonerDetail[i].stats.perkPrimaryStyle;
    //             const subRune: any = summonerDetail[i].stats.perkSubStyle;
    //             runesArr.push({
    //                 primaryRune,
    //                 subRune,
    //             })
    //         };
    //         // console.log(runesArr);

    //         // // 해당하는 룬 뽑는 함수
    //         const usedRunes: any[] = runesArr.map(rune => {
    //             // console.log('Object.entries(rune) ==> ', Object.entries(rune))
    //             const obj: any = {};
    //             for (const [key, value] of Object.entries(rune)) {
    //                 obj[key] = allRunesData.find(data => data.id === value)?.icon
    //             }
    //             return obj
    //         });
    //         // console.log(usedRunes);

    //         // // 해당하는 스펠 뽑는 함수
    //         // console.log(spellsArr)
    //         const usedSpells: any[] = spellsArr.map(spell => {
    //             // console.log(Object.entries(spell));
    //             const obj: any = {}
    //             for (const [key, value] of Object.entries(spell)) {
    //                 obj[key] = allSpellsData.find(data => Number(data.key) === value)?.id;
    //             }
    //             // console.log(obj)
    //             return obj
    //         });
    //         // console.log(usedSpells);

    //         // console.log(matchesInfo);

    //         for (let j = 0; j < 3; j++) {
    //             for (let i = 0; i < 150; i++) {
    //                 if (Number(allChampsData[i].key) === summonerDetail[j].championId) {
    //                     // console.log('같은거 있음')
    //                     champImages.push(
    //                         {
    //                             createdGame: matchesInfo[j].gameCreation,
    //                             gameDuration: matchesInfo[j].gameDuration,
    //                             teams: matchesInfo[j].teams,
    //                             gameId: matchesInfo[j].gameId,
    //                             champImage: allChampsData[i].image.full,
    //                             item0: summonerDetail[j].stats.item0,
    //                             item1: summonerDetail[j].stats.item1,
    //                             item2: summonerDetail[j].stats.item2,
    //                             item3: summonerDetail[j].stats.item3,
    //                             item4: summonerDetail[j].stats.item4,
    //                             item5: summonerDetail[j].stats.item5,
    //                             item6: summonerDetail[j].stats.item6,
    //                             spell1: usedSpells[j].spell1,
    //                             spell2: usedSpells[j].spell2,
    //                             gold: summonerDetail[j].stats.goldEarned,
    //                             ward: summonerDetail[j].stats.wardsPlaced,
    //                             kills: summonerDetail[j].stats.kills,
    //                             assists: summonerDetail[j].stats.assists,
    //                             deaths: summonerDetail[j].stats.deaths,
    //                             minionKillded: summonerDetail[j].stats.totalMinionsKilled,
    //                             rate: ((summonerDetail[j].stats.kills + summonerDetail[j].stats.assists) / summonerDetail[j].stats.deaths).toFixed(2),
    //                             gameResult: summonerDetail[j].stats.win ? 'Victory' : 'Defeat',
    //                             level: summonerDetail[j].stats.champLevel,
    //                             mainRune: usedRunes[j].primaryRune,
    //                             subRune: usedRunes[j].subRune,

    //                         }
    //                     )
    //                 }
    //             }
    //         }
    //         const newData = information.concat(champImages);


    //         setInformation(newData);
    //         setPageLoading(false);
    //         setLoadMore(false) // 로드하는 버튼 누르면 로딩이 시작되기 때문에 데이터를 다 로드하면 false로 해서 로딩 컴포넌트가 종료되고 다시 버튼이 뜬다.
    //         // console.log(champImages);

    //         // setLoaded(false);
    //     }


    // }, [allChampsData, summonerDetail])





    const handleStartClicked = () => {
        setLoadMore(true);
        setStart(start + 3);
    }


    return (
        <>
            <div className={gamesDetailLoading ? 'laoding-page' : 'matchHistory-page'}>
                {
                    gamesDetailLoading ?
                        <div className="loading" >
                            <Loading />
                        </div>
                        :
                        <div>
                            {console.log(matchesInfo)}
                            {
                                information.map((data, index) => {
                                    return (
                                        <div className="accordion-page" key={index}>
                                            <Accordion key={index} className="accordion">
                                                <div className="card">
                                                    <div className={`card-header ${data.gameResult === 'Victory' ? 'win' : 'lose'} `}>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey={data.gameId.toString()} className="accordion-toggle link">
                                                            <div className="first-info">
                                                                {/* {console.log('getPlayGameDate(data.createdGame) ==>> ', getPlayGameDate(data.createdGame))} */}
                                                                <span className="created-game">{getPlayGameDate(data.createdGame)}</span>
                                                                <span className="game-duration">{getPlayDuration(data.gameDuration)}</span>
                                                                <span className={`game-result ${data.gameResult === "Win" ? 'win_text' : 'lose_text'}`}>{data.gameResult}</span>
                                                            </div>
                                                            <div className="second-info">
                                                                <div className="level-champ">
                                                                    <span className="level">{data.level}</span>
                                                                    <img className="champ-image" src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.champImage}`} alt="images" />
                                                                </div>
                                                                <div className="spells-runes">
                                                                    <div className="spells">
                                                                        <span><img className="spell" src={`${API.GET_SPELLS_IMG}/${data.spell1}.png`} alt="images" /></span>
                                                                        <span><img className="spell" src={`${API.GET_SPELLS_IMG}/${data.spell2}.png`} alt="images" /></span>
                                                                    </div>
                                                                    <div className="runes">
                                                                        <span><img className="rune" src={`${API.GET_RUNES_IMG}/${data.mainRune}`} alt="images" /></span>
                                                                        <span><img className="rune" src={`${API.GET_RUNES_IMG}/${data.subRune}`} alt="images" /></span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="third-info">
                                                                <span className="gold">{data.gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} G</span> {/* 골드 세칸당 콤마(,) 찍는 함수 */}
                                                                <span className="rate">{data.rate}</span>
                                                                <div className="kda">
                                                                    <span className="kills">{data.kills}</span> / <span className="deaths">{data.deaths}</span> / <span className="assists">{data.deaths}</span>
                                                                </div>
                                                                <span className="cs">{data.minionKillded} ({`${(data.minionKillded / 60).toFixed(1)}`}) CS</span>
                                                            </div>

                                                            <div className="forth-info">
                                                                <div>
                                                                    {data.item0 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item0}.png`} alt="images" /></span>}
                                                                    {data.item1 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item1}.png`} alt="images" /></span>}
                                                                    {data.item2 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item2}.png`} alt="images" /></span>}
                                                                </div>
                                                                <div>
                                                                    {data.item3 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item3}.png`} alt="images" /></span>}
                                                                    {data.item4 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item4}.png`} alt="images" /></span>}
                                                                    {data.item5 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span> <img className="item" src={`${API.GET_ITEMS_IMG}/${data.item5}.png`} alt="images" /></span>}
                                                                    {data.item6 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item6}.png`} alt="images" /></span>}
                                                                </div>
                                                            </div>
                                                        </Accordion.Toggle>
                                                    </div>
                                                    {/* <Accordion.Collapse eventKey={data.gameId.toString()}>
                                                        <div className="card-body"><MatchedGameDetail clickedData={data} matchesInfo={matchesInfo[index]} allChampsData={allChampsData} allSpellsData={allSpellsData} allRunesData={allRunesData} /></div>
                                                    </Accordion.Collapse> */}
                                                </div>

                                            </Accordion>

                                        </div>

                                    )

                                }
                                )
                            }

                            <div className="load-data-button">
                                {loadMore ? <Loading /> : <button className="load-button" onClick={() => handleStartClicked()}>button</button>}

                            </div>

                        </div>

                }
            </div>

        </>
    )
}
