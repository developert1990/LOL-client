import React, { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { FaSearch } from "react-icons/fa";
import { Loading } from '../components/Loading';
import { API, TEST_BASE } from '../config/index';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { changeRegion } from '../actions/regionAction';
import { Link } from 'react-router-dom';
import { GameMatcheType, SummonerDetailType, SummonerInfoType } from '../types';
import { UserMatchHistory } from '../components/UserMatchHistory';

export const SearchPage = () => {
    const USER_ID = 'user account id';
    const regionStore = useSelector((state: initialAppStateType) => state.regionStore);
    const { region } = regionStore;
    // console.log('region: ', region)
    const [summonerID, setSummonerID] = useState('');
    const [errorMsg, setErrorMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [inputText, setInputText] = useState('');
    const [{ id, name, profileIconId, level, accountId }, setSummonerInfo] = useState<SummonerInfoType>({
        id: '',
        name: '',
        profileIconId: 0,
        level: 0,
        accountId: '',
    });
    const [{ queueType, tier, rank, leaguePoints, wins, losses }, setSummonerDetail] = useState<SummonerDetailType>({
        queueType: '',
        tier: '',
        rank: '',
        leaguePoints: 0,
        wins: 0,
        losses: 0,

    });
    const gameId: number[] = [];
    const [gameIdInfo, setGameIdInfo] = useState<number[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newInput = e.target.value;
        setSummonerID(newInput);
    }
    // console.log("1")
    // console.log("2")
    // 비동기 - 기다려주지 않는다
    // 동기 - 기다려준다.
    const handleClick = async (e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
        if (summonerID.length > 0) {
            // console.log(`${API.GET_SUMMONER_BY_NAME}/${summonerID}?region=${region}`)
            // const response = await fetch(`${API.GET_SUMMONER_BY_NAME}/${summonerID}?region=${region}`);
            const response = await fetch(`${TEST_BASE}/summonorById/proxy/${summonerID}/${region}`);
            const data = await response.json();
            // console.log(summonerID);
            // console.log(data);
            if (data.status === undefined) { // data를 뽑아오면 status 가 나타나지 않고 data가 없을경우에 data.status.status_code: 404 이런식으로 리턴 된다.
                // console.log('data 있음')
                // 유저의 고유 아이디를 로컬스토리지에 저장
                localStorage.setItem(USER_ID, data.id);
                // console.log(data.id);

                setErrorMsg(false)
                setSummonerInfo({
                    id: data.id,
                    name: data.name,
                    profileIconId: data.profileIconId,
                    level: data.summonerLevel,
                    accountId: data.accountId,
                });
            } else {
                // console.log('data 없음')
                setErrorMsg(true);
            }
        }
    }





    // useEffect(() => {
    //     if (!errorMsg)
    //         console.log('loading')
    // }, [id])

    // 두번 setState를 불러 오게 되면 랜더링 때문에 문제가 발생한다. 그래서 의존성배열에 id값을 두고 id값이 변하게 되면 fetch를 통해 setState 를 하게 된다.
    // 검색한 유저의 세부 정보 가져옴
    useEffect(() => {
        if (id) {
            (async () => {
                // const response2 = await fetch(`${API.GET_SUMMONER_DETAIL_BY_ID}/18DGpAfpkizFV_QeZruhnqFhjao8lcwqhzHKxbOcqfFRXA`)
                // console.log(id);
                // const response = await fetch(`${API.GET_SUMMONER_DETAIL_BY_ID}/${id}?region=${region}`)
                const response = await fetch(`${TEST_BASE}/summonorById/proxy/${id}/${region}/summonerDetail`);
                // console.log('3');
                const data = await response.json();
                // console.log(data);
                const typedData = data as SummonerDetailType[];
                const [details] = typedData;
                // console.log(details);
                setSummonerDetail({
                    queueType: details.queueType,
                    tier: details.tier,
                    rank: details.rank,
                    leaguePoints: details.leaguePoints,
                    wins: details.wins,
                    losses: details.losses,
                });
                setIsLoading(false)
            })();
        }
    }, [id, region]);



    // 해당유저의 게임 했던것들 정보 가져옴 총 100개
    useEffect(() => {
        // console.log('match')
        if (tier) {
            (
                async () => {
                    // console.log(accountId)
                    // const response = await fetch(`${API.GET_MATCH_ID}/${accountId}?region=${region}`)
                    const response = await fetch(`${TEST_BASE}/summonorById/proxy/${accountId}/${region}/matchId`);
                    const data = await response.json();
                    const typedData = data as GameMatcheType;
                    const { matches } = typedData;
                    // for (let i = 0; i < 100; i++) {
                    //     gameId.push(matches[i].gameId);
                    // }
                    matches.map((match) => gameId.push(match.gameId));
                    setGameIdInfo([...gameId]);
                }
            )();
        }
    }, [accountId, region, tier]);

    // useEffect(() => {
    //     console.log('gameIdInfo: ' + gameIdInfo)


    //     if (gameIdInfo[0]) {
    //         (
    //             async () => {
    //                 console.log('gameId: ' + gameId);
    //                 console.log(profileIconId)
    //                 // const response = await fetch(`${API.GET_MATCH_DETAILS}/${gameIdInfo[1]}?region=${region}`);
    //                 const response = await fetch(`${TEST_BASE}/summonorById/proxy/${accountId}/${region}/matchDetail`);
    //                 const data = await response.json();
    //                 console.log(data);
    //             }
    //         )();

    //         setIsLoading(false);
    //     }
    // }, [gameIdInfo]);


    // input 에 focusing useRef() 사용
    const focusRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (focusRef && focusRef.current !== null) {
            focusRef.current.focus();
        }
    }, [])

    return (
        <div className="wrap">

            <div className="search">
                {/* <input type="text" className="summoner-id" placeholder="Enter the Summoner's ID" onChange={e => setSummonerID(e.target.value)} value={summonerID} /> */}
                <input type="text" className="searchTerm" placeholder="Enter the Summoner's ID" onChange={handleChange} onKeyPress={
                    (e) => {
                        if (e.key === 'Enter')
                            handleClick(e);
                    }
                } ref={focusRef} />
                <button type="submit" className="searchButton" onClick={(e: MouseEvent<HTMLButtonElement>) => handleClick(e as any)}>
                    <FaSearch />
                </button>
            </div>

            {/* 아래에 꺼 붙여 넣으면 됨 */}
            {
                !errorMsg ?
                    (
                        // 이렇게 하면 반드시 id가 존재하고 isLoading 이 true 인 경우에 아래 식을 실행 시키도록 한다 즉, 검색어에 유저의 이름을 입력하고 검색을 해야 loading이나 결과가 나타난다.
                        id && isLoading ?

                            <div className="loading" >
                                <Loading />
                            </div>
                            :
                            <div className="summoner-info">
                                {
                                    name.length > 0 && tier.length > 0 &&
                                    <div>
                                        <div className="summoner_info_top">
                                            <Link className="logo-name-link link" to={
                                                {
                                                    pathname: '/search/userInfo/userMatchHistory',
                                                    state: {
                                                        gameIdInfo: gameIdInfo,
                                                        accountId: accountId,
                                                        id: id,
                                                    }
                                                }
                                            }

                                            >
                                                <img className="logo-img" src={`${API.GET_PROFILEICON}/${profileIconId}.png`} alt="profileIcon" />
                                                <span className="level">{level}</span>
                                                <span className="name">{name}</span>
                                            </Link>
                                        </div>

                                        <div className="summoner_info_bottom">
                                            <div className="summoner_info_bottom_left">

                                                <div className="detail-info custom_card">
                                                    <div className="detail_title">Rank</div>
                                                    <div className="detail-parent">
                                                        <img className="emblem-img" src={`/images/ranked-emblems/${tier}.png`} alt="tier-emblem" />

                                                        <div className="detail">
                                                            <span className="queue-type">{queueType}</span>
                                                            <div className="tier-lp">
                                                                <span className="tier">{tier} <span className="rank">{rank}</span> </span>
                                                                <span className="lp"> / {leaguePoints} LP</span>
                                                            </div>
                                                            <span className="win-lost">{`${wins} W ${losses} L`}</span>
                                                            <div className="winRate-totalGame">
                                                                <span className="winRate">{`${Math.round(wins / (wins + losses) * 100)}%`}</span>
                                                                <span className="totalGame">{wins + losses} games</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="custom_card detail_graph">
                                                    역대 기록 그래프
                                                </div>

                                            </div>
                                            <div className="summoner_info_bottom_right">
                                                {
                                                    // gameIdInfo 를 다 받으면 길이가 0 이상이겠지 그러면 랜더 되도록
                                                    gameIdInfo.length > 0 && accountId &&
                                                    <UserMatchHistory gameIdInfo={gameIdInfo} accountId={accountId} id={id} />

                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                    )
                    :
                    <div className="summoner-error">This summoner is not registered at POPO.GG.<br /> Please check spelling and region</div>
            }


        </div>

    )
}

























// {
//     !errorMsg ?
//     (
//         // 이렇게 하면 반드시 id가 존재하고 isLoading 이 true 인 경우에 아래 식을 실행 시키도록 한다 즉, 검색어에 유저의 이름을 입력하고 검색을 해야 loading이나 결과가 나타난다.
//         id && isLoading ?

//             <div className="loading" >
//                 <Loading />
//             </div>
//             :
//             <div className="summoner-info">
//                 {
//                     name.length > 0 && tier.length > 0 &&
//                     <div>
//                         <Link className="logo-name-link link" to={
//                             {
//                                 pathname: '/search/userInfo/userMatchHistory',
//                                 state: {
//                                     gameIdInfo: gameIdInfo,
//                                     accountId: accountId,
//                                     id: id,
//                                 }
//                             }
//                         }

//                         >
//                             <img className="logo-img" src={`${API.GET_PROFILEICON}/${profileIconId}.png`} alt="profileIcon" />
//                             <span className="level">{level}</span>
//                             <span className="name">{name}</span>
//                         </Link>
//                         <div className="detail-info">
//                             <img className="emblem-img" src={require(`../images/ranked-emblems/${tier}.png`)} alt="tier-emblem" />
//                             <div className="detail-parent">
//                                 <div className="detail">
//                                     <span className="tier">{tier}</span>

//                                     <span className="lp">LP: {leaguePoints} LP</span>
//                                     <span className="win-lost">{`${wins} W ${losses} L`}</span>
//                                     <span className="rank">{rank}</span>
//                                     <span className="queue-type">{queueType}</span>
//                                 </div>
//                             </div>
//                             <div className="circle">
//                                 {/* https://github.com/kevinsqi/react-circular-progressbar 여기 참고하면됨 */}
//                                 <CircularProgressbar strokeWidth="10" value={`${Math.round(wins / (wins + losses) * 100)}`} text={`${Math.round(wins / (wins + losses) * 100)}%`} className="percentage-circle"
//                                     styles={buildStyles({ textColor: 'white', pathColor: '#2E6DEB', trailColor: '#F05950' })}
//                                 />;
//                                         </div>
//                         </div>
//                     </div>
//                 }
//             </div>
//     )
//     :
//     <div className="summoner-error">This summoner is not registered at POPO.GG.<br /> Please check spelling and region</div>
// }
