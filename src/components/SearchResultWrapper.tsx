import React from 'react';
import { ProfileMenu } from '../components/index';
import { Route } from 'react-router-dom';
import { ProfilePage } from '../pages/ProfilePage';
import { useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { Masteries } from '../components/Masteries';

export const SearchResultWrapper = () => {
    const getSummonerDetailStore = useSelector((state: initialAppStateType) => state.getSummonerDetailStore);
    const { isLoading: getSummonerDetailLoading, error: detailError, summonerDetail } = getSummonerDetailStore;

    return (
        <div className="searchWrapper">
            <Route path="/search/userInfo/" component={ProfileMenu} />
            <Route path="/search/userInfo/overview/:region" render={() => {
                return (

                    summonerDetail ?
                        <ProfilePage summonerDetail={summonerDetail} getSummonerDetailLoading={getSummonerDetailLoading} /> :
                        !detailError ?
                            "" :
                            <div style={{ color: "red" }}>No rank information for current filters.</div>
                )
            }} />
            <Route path="/search/userInfo/masteries/:region" component={Masteries} />
        </div>
    )
}
