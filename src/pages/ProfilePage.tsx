
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetail } from '../actions/getGameDetailAction';
import { Loading } from '../components/Loading';
import UserMatchHistory from '../components/UserMatchHistory';
import { initialAppStateType } from '../store';
import { GameImageType } from '../types';



export const ProfilePage = () => {

    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { isLoading: getSummonerIsLoading, error: summonerInfoError, summonerInfo } = getSummonerStore;

    const getSummonerDetailStore = useSelector((state: initialAppStateType) => state.getSummonerDetailStore);
    const { error: detailError, summonerDetail } = getSummonerDetailStore;

    const getGames100Store = useSelector((state: initialAppStateType) => state.getGames100Store);
    const { error: games100Error, games100, matchIds } = getGames100Store;

    const getGamesDetailStore = useSelector((state: initialAppStateType) => state.getGameDetailStore);
    const { detailedImageData, error: gameDetailError, games, isLoading: summoerMatchDetailLoading, summonerMatchDetail } = getGamesDetailStore;


    const regionStore = useSelector((state: initialAppStateType) => state.regionStore);
    const { region } = regionStore;

    const [information, setInformation] = useState<GameImageType[]>([]);

    const [start, setStart] = useState(0);

    const [loadMore, setLoadMore] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (matchIds && summonerInfo) {
            dispatch(getGameDetail(start, matchIds, region, summonerInfo.accountId));
        }
    }, [start, summonerInfo, matchIds])

    useEffect(() => {
        setInformation([...information, ...detailedImageData]);
        setLoadMore(false);
    }, [detailedImageData])

    useEffect(() => {
        if (!games100) {
            setInformation([]);
        }
    }, [summonerInfo])


    return (
        <div className="summoner-info">
            {

                // 이렇게 하면 반드시 id가 존재하고 isLoading 이 true 인 경우에 아래 식을 실행 시키도록 한다 즉, 검색어에 유저의 이름을 입력하고 검색을 해야 loading이나 결과가 나타난다.
                getSummonerIsLoading && !summonerDetail ?
                    <div className="loading" >
                        <Loading />
                    </div>
                    :
                    !summonerInfoError ?
                        !detailError && summonerInfo && summonerDetail && summonerMatchDetail ?
                            <div >
                                <div>
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
                                                information.length > 0 ?
                                                    <UserMatchHistory
                                                        gameIdInfo={matchIds} accountId={summonerInfo.accountId} id={summonerInfo.id} setStart={setStart} start={start}
                                                        information={information} loadMore={loadMore} setLoadMore={setLoadMore}
                                                    />
                                                    :
                                                    <div className="loading" >
                                                        <Loading />
                                                    </div>

                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div style={{ color: "red" }}>No rank information for current filters.</div>
                        :
                        <>
                            <div style={{ color: "red" }} className="summoner-error">
                                {summonerInfoError}
                                <div> This summoner is not registered at H.GG.<br /> Please check spelling and region</div>
                            </div>
                        </>
            }
        </div>
    )
}
