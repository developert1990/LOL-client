/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ProfileMenu } from '../components/index';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initialAppStateType } from '../store';
import { Masteries } from '../components/Masteries';
import { GameImageType } from '../types';
import { getGameDetail } from '../actions/getGameDetailAction';
import { SummonerProfile } from './SummonerProfile';


export const SearchResultWrapper = () => {
    const { isLoading, error, summonerDetail } = useSelector((state: initialAppStateType) => state.getSummonerDetailStore);

    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { summonerInfo } = getSummonerStore;


    const getGames100Store = useSelector((state: initialAppStateType) => state.getGames100Store);
    const { games100, matchIds } = getGames100Store;

    const getGamesDetailStore = useSelector((state: initialAppStateType) => state.getGameDetailStore);
    const { detailedImageData } = getGamesDetailStore;


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
        <div className="searchWrapper">
            <Route path="/search/userInfo/" component={ProfileMenu} />
            <Route path="/search/userInfo/overview/:region" render={
                () =>
                    <SummonerProfile summonerDetail={summonerDetail} isLoading={isLoading} hasError={error}
                        information={information} start={start} setStart={setStart} loadMore={loadMore} setLoadMore={setLoadMore}
                    />} />
            <Route path="/search/userInfo/masteries/:region" component={Masteries} />
        </div>
    )
}
