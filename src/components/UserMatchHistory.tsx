


import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { API, TEST_BASE } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { Accordion, Card, Button } from 'react-bootstrap';
import { MatchedGameDetail } from './MatchedGameDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import darkgrey from '../images/darkgrey.png';
import { Loading } from './Loading';
import { initialAppStateType } from '../store';
import { ChampDetailType, GameImageType, MatchedGameType, ParticipantsStatsType, ParticipantsType, RuneBigType, RunesIngameType, SpellDetailType, SpellsIngameType } from '../types';

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
    const regionStore = useSelector((state: initialAppStateType) => state.regionStore);
    const { region } = regionStore;
    const { isLoading, champs } = useSelector((state: initialAppStateType) => state.champsStore);
    const { spells } = useSelector((state: initialAppStateType) => state.spellsStore);
    const { runes } = useSelector((state: initialAppStateType) => state.runesStore);
    // const location = useLocation<LocationType>();
    const [pageLoading, setPageLoading] = useState(true);
    // console.log(location.state)
    // const accountId = location.state.accountId;
    // console.log(accountId)
    const [matchesInfo, setMatchesInfo] = useState<MatchedGameType[]>([]);
    const [loaded, setLoaded] = useState(false);
    // const [...gameIds] = location.state.gameIdInfo;
    // console.log(gameIds);

    const matchesData: MatchedGameType[] = [];
    const [summonerDetail, setSummonerDetail] = useState<ParticipantsType[]>([]);
    const [result, setResult] = useState<boolean[]>([]);

    const dispatch = useDispatch();
    const [allChampsData, setAllChampsData] = useState<ChampDetailType[]>([]);
    const [allSpellsData, setAllSpellsData] = useState<SpellDetailType[]>([]);
    const [allRunesData, setAllRunesData] = useState<RuneBigType[]>([]);



    const champImages: GameImageType[] = [];
    const spellsArr: SpellsIngameType[] = [];
    const runesArr: RunesIngameType[] = [];
    const [information, setInformation] = useState<GameImageType[]>([]);

    const [start, setStart] = useState(0);
    const [loadMore, setLoadMore] = useState(false);
    const [matchesAllInfo, setMatchesAllInfo] = useState<MatchedGameType[]>([]);
    // console.log(start)


    useEffect(() => {
        // console.log('fetch 한거 set한다. 2')
        setAllChampsData(Object.values(champs))
        setAllSpellsData(Object.values(spells));
        setAllRunesData(runes);
    }, [champs, spells, runes]);

    useEffect(() => {
        (
            async () => {
                console.log('data 받음  3');
                console.log('gameIdInfo ==>> ', gameIdInfo)
                // console.log(start, start + 3)
                for (let i = start; i < start + 3; i++) {
                    // console.log(start)
                    // console.log('for문들어옴')
                    // server 측에 path 가 '/' 이곳으로 들어와서 프록시 서버를 통해서 정보를 호출한다.
                    // const response = await fetch(`${API.GET_MATCH_DETAILS}/${gameIds[i]}?region=${region}`);
                    const response = await fetch(`${TEST_BASE}/summonorById/proxy/${gameIdInfo[i]}/${region}/matchList`);
                    const data = await response.json();
                    console.log(data);
                    matchesData.push(data);

                }
                // console.log(matchesData);

                const newData = matchesAllInfo.concat(matchesData);

                // console.log(newData);
                setMatchesAllInfo(newData);

                setMatchesInfo(matchesData);
                setLoaded(true);
            }

        )();
    }, [start]);



    useEffect(() => {
        console.log('loaded 되서 들어옴  4');
        console.log(matchesInfo)
        console.log(loaded)
        if (loaded) {
            console.log('matchesinfo check')
            console.log(matchesInfo)
            const participantId = matchesInfo.map((data) => data.participantIdentities.filter((data) => data.player.accountId === accountId)[0].participantId);
            console.log(participantId);
            const summonorMatchDetail = matchesInfo.map((data, index) => data.participants.filter((data) => data.stats.participantId === participantId[index])[0])
            console.log("매치 디테일: ", summonorMatchDetail);
            setSummonerDetail(summonorMatchDetail);

            const playResult = summonorMatchDetail.map((data) => data.stats.win)
            console.log(playResult);
            setResult(playResult);

        }

    }, [matchesInfo, loaded, accountId])
    // const { gameDuration, gameMode, participantIdentities, participants, teams } = matchesInfo;



    useEffect(() => {
        console.log('isLoading', isLoading)
        console.log('summonerDetail', summonerDetail)

        console.log('룬, 스펠, 챔프 뽑음. 5')
        if (!isLoading && summonerDetail.length > 0) {
            // console.log('룬, 스펠, 챔프 뽑으러 if 문안에 들어옴')
            console.log(summonerDetail);
            // console.log(allChampsData);
            // console.log(allRunesData);
            console.log('allRunesData ==>>> ', allRunesData)
            const a = summonerDetail.map((data) => data.championId);
            const b = allChampsData.map((data) => data.key);

            // console.log(a);
            // console.log(b);

            for (let i = 0; i < 3; i++) {
                spellsArr.push({
                    spell1: summonerDetail[i].spell1Id,
                    spell2: summonerDetail[i].spell2Id,
                });
            }

            // console.log(allSpellsData);
            // console.log(spellsArr);

            for (let i = 0; i < 3; i++) {
                runesArr.push({
                    primaryRune: summonerDetail[i].stats.perkPrimaryStyle,
                    subRune: summonerDetail[i].stats.perkSubStyle,
                })
            };
            console.log(runesArr);

            // // 해당하는 룬 뽑는 함수
            const usedRunes: any[] = runesArr.map(rune => {
                console.log('Object.entries(rune) ==> ', Object.entries(rune))
                const obj: any = {};
                for (const [key, value] of Object.entries(rune)) {
                    obj[key] = allRunesData.find(data => data.id === value)?.icon
                }
                return obj
            });
            // console.log(usedRunes);

            // // 해당하는 스펠 뽑는 함수
            // console.log(spellsArr)
            const usedSpells: any[] = spellsArr.map(spell => {
                console.log(Object.entries(spell));
                const obj: any = {}
                for (const [key, value] of Object.entries(spell)) {
                    obj[key] = allSpellsData.find(data => Number(data.key) === value)?.id;
                }
                // console.log(obj)
                return obj
            });
            console.log(usedSpells);

            console.log(matchesInfo);

            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < 150; i++) {
                    if (Number(allChampsData[i].key) === summonerDetail[j].championId) {
                        console.log('같은거 있음')
                        champImages.push(
                            {
                                createdGame: matchesAllInfo[j].gameCreation,
                                gameDuration: matchesAllInfo[j].gameDuration,
                                teams: matchesAllInfo[j].teams,
                                gameId: matchesAllInfo[j].gameId,
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
                                gameResult: result[j] ? 'Win' : 'Defeat',
                                level: summonerDetail[j].stats.champLevel,
                                mainRune: usedRunes[j].primaryRune,
                                subRune: usedRunes[j].subRune,

                            }
                        )
                    }
                }
            }
            const newData = information.concat(champImages);
            console.log(newData);


            setInformation(newData);
            setPageLoading(false);
            setLoadMore(false) // 로드하는 버튼 누르면 로딩이 시작되기 때문에 데이터를 다 로드하면 false로 해서 로딩 컴포넌트가 종료되고 다시 버튼이 뜬다.
            console.log(champImages);


        }


    }, [allChampsData, summonerDetail])






    // 게임 언제 했는지 뽑아내는 함수
    const getPlayGameDate = (unixTime: number) => {
        const timeGap: number = Number(new Date()) - unixTime;
        let stime = timeGap / 1000;
        const year = 86400 * (365.25);
        const month = 86400 * 30.4375;
        const day = 86400;
        const hour = 3600;
        const min = 60;

        if (stime >= year) return (`${stime / year === 1 ? `${stime / year} year ago` : `${stime / year} years ago`}`);
        if (stime >= month) return (`${stime / month === 1 ? `${stime / month} month ago` : `${stime / month} months ago`}`);
        if (stime >= day) return (`${stime / day === 1 ? `${stime / day} day ago` : `${stime / day} days ago`}`);
        if (stime >= hour) return (`${stime / hour === 1 ? `${stime / hour} hour ago` : `${stime / hour} hours ago`}`);
        return (stime / min) + "minutes ago";
    }

    // 게임 시간 뽑아내는 함수
    const getPlayDuration = (duration: number) => {
        if (duration >= 3600) {
            const hours = Math.floor(duration / 3600);
            const minutes = Math.floor((duration - 3600) / 60);
            const seconds = duration - 3600 - (minutes * 60);
            return (
                `${hours === 1 ? hours.toFixed(0) + ' hour' : hours.toFixed(0) + ' hours'} ${minutes === 1 ? minutes.toFixed(0) + ' min' : minutes.toFixed(0) + ' mins'} ${seconds === 1 || seconds === 0 ? seconds.toFixed(0) + ' sec' : seconds.toFixed(0) + ' secs'}`
            )
        } else {
            const minutes = Math.floor(duration / 60);
            const seconds = duration - (minutes * 60);
            return (
                ` ${minutes === 1 ? minutes + ' min' : minutes + ' mins'} ${seconds === 1 || seconds === 0 ? seconds + ' sec' : seconds + ' secs'}`
            )
        }
    }

    const handleStartClicked = () => {
        console.log('button clicked')
        setLoadMore(true);
        setStart(start + 3);
    }


    return (
        <>
            <div className={pageLoading ? 'laoding-page' : 'matchHistory-page'}>
                {
                    pageLoading ?
                        <div className="loading" >
                            <Loading />
                        </div>
                        :
                        <div>
                            {console.log(information)}
                            {
                                information.map((data, index) => {
                                    return (
                                        <div className="accordion-page" key={index}>
                                            <Accordion key={index} className="accordion">
                                                <div className="card">
                                                    <div className={`card-header ${data.gameResult === 'Win' ? 'win' : 'lose'} `}>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey={data.gameId.toString()} className="accordion-toggle link">
                                                            <div className="first-info">
                                                                {console.log('getPlayGameDate(data.createdGame) ==>> ', getPlayGameDate(data.createdGame))}
                                                                <span className="created-game">{getPlayGameDate(data.createdGame)}</span>
                                                                <span className="game-duration">{getPlayDuration(data.gameDuration)}</span>
                                                                <span className="game-result">{data.gameResult}</span>
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
                                                                    {data.item0 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item0}.png`} alt="images" /></span>}
                                                                    {data.item1 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item1}.png`} alt="images" /></span>}
                                                                    {data.item2 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item2}.png`} alt="images" /></span>}
                                                                </div>
                                                                <div>
                                                                    {data.item3 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item3}.png`} alt="images" /></span>}
                                                                    {data.item4 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item4}.png`} alt="images" /></span>}
                                                                    {data.item5 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span> <img className="item" src={`${API.GET_ITEMS_IMG}/${data.item5}.png`} alt="images" /></span>}
                                                                    {data.item6 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item6}.png`} alt="images" /></span>}
                                                                </div>
                                                            </div>



                                                        </Accordion.Toggle>
                                                    </div>
                                                    {console.log(matchesAllInfo)}
                                                    {/* <Accordion.Collapse eventKey={data.gameId.toString()}>
                                            <div className="card-body"><MatchedGameDetail clickedData={data} matchesInfo={matchesAllInfo[index]} allChampsData={allChampsData} allSpellsData={allSpellsData} allRunesData={allRunesData} /></div>
                                        </Accordion.Collapse> */}
                                                </div>

                                            </Accordion>

                                        </div>

                                    )

                                })}

                            <div className="load-data-button">
                                {/* <Loading /> 이거 넣을 거임 */}
                                {loadMore ? <Loading /> : <button className="load-button" onClick={() => handleStartClicked()}>button</button>}

                            </div>

                        </div>

                }
            </div>

        </>
    )
}
