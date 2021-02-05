
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetail } from '../actions/getGameDetailAction';
import { Loading } from '../components/Loading';
import UserMatchHistory from '../components/UserMatchHistory';
import { initialAppStateType } from '../store';
import { GameImageType, SummonerDetailType } from '../types';
import { HistoryGraphCard, SummonerDetailCard } from '../components/small_components/index';


interface ProfilePagePropsType {
    summonerDetail: SummonerDetailType;
    getSummonerDetailLoading: boolean;
}

export const ProfilePage: React.FC<ProfilePagePropsType> = ({ summonerDetail, getSummonerDetailLoading }) => {

    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { isLoading: getSummonerIsLoading, error: summonerInfoError, summonerInfo } = getSummonerStore;

    // const getSummonerDetailStore = useSelector((state: initialAppStateType) => state.getSummonerDetailStore);
    // const { isLoading: getSummonerDetailLoading, error: detailError, summonerDetail } = getSummonerDetailStore;

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
                !summonerDetail && getSummonerDetailLoading ?
                    <Loading /> : (
                        <div className="summoner_info_bottom">

                            <div className="summoner_info_bottom_left">
                                <SummonerDetailCard summonerDetail={summonerDetail} />
                                <HistoryGraphCard />
                            </div>

                            <div className="summoner_info_bottom_right">
                                {console.log('information ====================', information)}
                                {
                                    information.length === 0 ?
                                        <Loading /> :
                                        <UserMatchHistory
                                            setStart={setStart} start={start} information={information} loadMore={loadMore} setLoadMore={setLoadMore}
                                        />

                                }
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
