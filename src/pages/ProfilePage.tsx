import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { UserMatchHistory } from '../components/UserMatchHistory';
import { UserMenuBar } from '../components/UserMenuBar';
import { API, TEST_BASE } from '../config';
import { GET_SUMMONER_RESET } from '../constants/getSummonerConstants';
import { initialAppStateType } from '../store';
import { GameMatcheType, SummonerDetailType, SummonerInfoType } from '../types';



export const ProfilePage = () => {
    const regionStore = useSelector((state: initialAppStateType) => state.regionStore);
    const { region } = regionStore;
    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { isLoading: getSummonerIsLoading, error, summonerInfo } = getSummonerStore;
    const USER_ID = 'user account id';

    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

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


    useEffect(() => {
        if (summonerInfo) {
            console.log("서머너 받아오고 실행됨")
            localStorage.setItem(USER_ID, summonerInfo.id);
            // console.log(data.id);

            setErrorMsg(false)
            setSummonerInfo({
                id: summonerInfo.id,
                name: summonerInfo.name,
                profileIconId: summonerInfo.profileIconId,
                level: summonerInfo.summonerLevel,
                accountId: summonerInfo.accountId,
            });
        }
    }, [summonerInfo])


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



    return (
        <div>
            {
                !errorMsg ?
                    (
                        // 이렇게 하면 반드시 id가 존재하고 isLoading 이 true 인 경우에 아래 식을 실행 시키도록 한다 즉, 검색어에 유저의 이름을 입력하고 검색을 해야 loading이나 결과가 나타난다.
                        getSummonerIsLoading ?

                            <div className="loading" >
                                <Loading />
                            </div>
                            :
                            <div className="summoner-info">
                                {
                                    name.length > 0 && tier.length > 0 &&
                                    <div>
                                        <div className="summoner_info_top">
                                            <div className="logo-name-link link">
                                                <img className="logo-img" src={`${API.GET_PROFILEICON}/${profileIconId}.png`} alt="profileIcon" />
                                                <span className="level">{level}</span>
                                                <span className="name">{name}</span>
                                            </div>
                                            <div className="summoer_menu">
                                                <UserMenuBar />
                                            </div>
                                        </div>

                                        <div className="summoner_info_bottom">
                                            <div className="summoner_info_bottom_left">

                                                <div className="detail-info custom_card">
                                                    <div className="detail_title">Rank</div>
                                                    <div className="detail-parent">
                                                        <img className="emblem-img" src={require(`../images/ranked-emblems/${tier}.png`).default} alt="tier-emblem" />

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
