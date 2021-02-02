import React, { useEffect } from 'react';
import { Footer, NavbarComp, ProfileMenu, SideAdvertisement } from '../components/index';
import { BrowserRouter, Route } from 'react-router-dom';
import { MainPage, SearchPage } from '../pages/index'
import lolLogo from '../images/lol-logo.png';
import { ProfilePage } from '../pages/ProfilePage';
import { useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { Masteries } from '../components/Masteries';
import { useQuery } from '../hooks/useQuery';

export default () => {
    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { isLoading: getSummonerIsLoading, error, summonerInfo } = getSummonerStore;

    const query = useQuery();

    useEffect(() => {
        console.log(query);
    }, [query])

    // drill down
    return (
        <BrowserRouter>
            <NavbarComp />
            <div className="components-wrap">
                <div className="logo-img">
                    <img src={lolLogo} alt="main-logo-img" />
                </div>

                <div className="searchOuter">
                    <SearchWrapper />
                    <Route path="/search/userInfo/" component={SideAdvertisement} />
                </div>

                <Route path="/" component={MainPage} exact />
            </div>
            <Footer />
        </BrowserRouter>
    )
}

const SearchWrapper = () => {
    return (
        <div className="searchWrapper">
            <Route path="/search/userInfo/" component={ProfileMenu} />
            <Route path="/search/userInfo/overview/:region" component={ProfilePage} />
            <Route path="/search/userInfo/masteries/:region" component={Masteries} />
        </div>
    )
}