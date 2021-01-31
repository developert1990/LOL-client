import React from 'react';
import { Footer, NavbarComp } from '../components/index';
import { BrowserRouter, Route } from 'react-router-dom';
import { MainPage, SearchPage } from '../pages/index'
import { UserMatchHistory } from '../components/UserMatchHistory';
import lolLogo from '../images/lol-logo.png';
import { ProfilePage } from '../pages/ProfilePage';
import { useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { Masteries } from '../components/Masteries';
import { UserMenuBar } from '../components/UserMenuBar';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { isLoading: getSummonerIsLoading, error, summonerInfo } = getSummonerStore;

    return (
        <BrowserRouter>
            <NavbarComp />
            <div className="components-wrap">
                <div className="logo-img">
                    <img src={lolLogo} alt="main-logo-img" />
                </div>
                <Route path="/" component={MainPage} exact />
                <Route path="/search" component={SearchPage} />
                <Route path="/search/userInfo/:region/name=:id/history" component={ProfilePage} />
                <Route path="/search/userInfo/:region/name=:id/masteries" component={Masteries} />
            </div>
            <Footer />
        </BrowserRouter>
    )
}