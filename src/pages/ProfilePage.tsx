import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../components/Loading';
import UserMatchHistory from '../components/UserMatchHistory';
import { TEST_BASE } from '../config';
import { initialAppStateType } from '../store';
import { GameMatcheType, SummonerDetailType, SummonerInfoType } from '../types';



export const ProfilePage = () => {
    const regionStore = useSelector((state: initialAppStateType) => state.regionStore);
    const { region } = regionStore;

    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { isLoading: getSummonerIsLoading, error, summonerInfo } = getSummonerStore;

    const getSummonerDetailStore = useSelector((state: initialAppStateType) => state.getSummonerDetailStore);
    const { error: detailError, summonerDetail } = getSummonerDetailStore;

    const getGames100Store = useSelector((state: initialAppStateType) => state.getGames100Store);
    const { error: games100Error, games100, gameIdInfo } = getGames100Store;



    return (
        <div>
            {

                // 이렇게 하면 반드시 id가 존재하고 isLoading 이 true 인 경우에 아래 식을 실행 시키도록 한다 즉, 검색어에 유저의 이름을 입력하고 검색을 해야 loading이나 결과가 나타난다.
                getSummonerIsLoading ?

                    <div className="loading" >
                        <Loading />
                    </div>
                    :
                    !error ?
                        detailError == "" && summonerInfo ?
                            <div className="summoner-info">
                                {
                                    summonerDetail &&
                                    <div>
                                        {console.log('summonerDetail --------->>>>>>>>>', summonerDetail)}
                                        <div className="summoner_info_bottom">
                                            <div className="summoner_info_bottom_left">
                                                <div className="detail-info custom_card">

                                                    <div>
                                                        <div className="detail_title">Rank</div>
                                                        <div className="detail-parent">
                                                            <img className="emblem-img" src={require(`../images/ranked-emblems/${summonerDetail.tier}.png`).default} alt="tier-emblem" />

                                                            <div className="detail">
                                                                <span className="queue-type">{summonerDetail.queueType}</span>
                                                                <div className="tier-lp">
                                                                    <span className="tier">{summonerDetail.tier} <span className="rank">{summonerDetail.rank}</span> </span>
                                                                    <span className="lp"> / {summonerDetail.leaguePoints} LP</span>
                                                                </div>
                                                                <span className="win-lost">{`${summonerDetail.wins} W ${summonerDetail.losses} L`}</span>
                                                                <div className="winRate-totalGame">
                                                                    <span className="winRate">{`${Math.round(summonerDetail.wins / (summonerDetail.wins + summonerDetail.losses) * 100)}%`}</span>
                                                                    <span className="totalGame">{summonerDetail.wins + summonerDetail.losses} games</span>
                                                                </div>
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
                                                    games100Error === "" && games100 && gameIdInfo.length > 0 &&
                                                    <UserMatchHistory gameIdInfo={gameIdInfo} accountId={summonerInfo.accountId} id={summonerInfo.id} />

                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            :
                            <div style={{ color: "red" }}>No rank information for current filters.</div>
                        :
                        <>
                            <div style={{ color: "red" }} className="summoner-error">
                                {error}
                                <div> This summoner is not registered at H.GG.<br /> Please check spelling and region</div>
                            </div>
                        </>
            }
        </div>
    )
}
