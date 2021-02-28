import React from 'react';
import { Footer, NavbarComp, SearchResultWrapper, SideAdvertisement } from '../components/index';
import { BrowserRouter, Route } from 'react-router-dom';
import { ChampionDetailPage, ChampionsPage, MainPage, RankPage, SigninPage, SignUpPage } from '../pages/index'
import lolLogo from '../images/lol-logo.png';
import { useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { Loading } from '../components/Loading';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default () => {
    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { isLoading: getSummonerIsLoading } = getSummonerStore;

    // const query = useQuery();
    // useEffect(() => {
    //     console.log(query);
    // }, [query])


    // drill down
    return (
        <BrowserRouter>
            <NavbarComp />
            <div className="components-wrap">
                <div className="logo-img">
                    <img src={lolLogo} alt="main-logo-img" />
                </div>
                <div className="searchOuter">
                    {
                        getSummonerIsLoading ? <Loading /> : <SearchResultWrapper />
                    }
                    <Route path="/search/userInfo/" component={SideAdvertisement} />
                </div>
                <Route path="/champions/detail/" component={ChampionDetailPage} />
                <Route path="/champions" component={ChampionsPage} exact />
                <Route path="/rank" component={RankPage} />
                <Route path="/signin" component={SigninPage} />
                <Route path="/register" component={SignUpPage} />
                <Route path="/" component={MainPage} exact />
            </div>
            <Footer />
        </BrowserRouter>
    )
}



