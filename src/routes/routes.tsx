import React, { useEffect, useState } from 'react';
import { Footer, NavbarComp, SearchResultWrapper, SideAdvertisement } from '../components/index';
import { BrowserRouter, Route } from 'react-router-dom';
import { MainPage } from '../pages/index'
import lolLogo from '../images/lol-logo.png';
import { useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { useQuery } from '../hooks/useQuery';
import { Loading } from '../components/Loading';

export default () => {
    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { isLoading: getSummonerIsLoading, error, summonerInfo } = getSummonerStore;



    const [profileError, setProfileError] = useState<string>("");


    const query = useQuery();
    // useEffect(() => {
    //     console.log(query);
    // }, [query])


    useEffect(() => {
        console.log("라우터 유즈이펙트 *********************", profileError)
        if (profileError !== "") {
            setProfileError("");
        }
    }, [summonerInfo])

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

                <Route path="/" component={MainPage} exact />
            </div>
            <Footer />
        </BrowserRouter>
    )
}



