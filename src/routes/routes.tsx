import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Footer, NavbarComp, ProfileMenu, SideAdvertisement } from '../components/index';
import { BrowserRouter, Route } from 'react-router-dom';
import { MainPage, SearchPage } from '../pages/index'
import lolLogo from '../images/lol-logo.png';
import { ProfilePage } from '../pages/ProfilePage';
import { useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { Masteries } from '../components/Masteries';
import { useQuery } from '../hooks/useQuery';
import { profile } from 'console';

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
                    <SearchWrapper profileError={profileError} setProfileError={setProfileError} />
                    <Route path="/search/userInfo/" component={SideAdvertisement} />
                </div>

                <Route path="/" component={MainPage} exact />
            </div>
            <Footer />
        </BrowserRouter>
    )
}

interface SearchWrapperPropsType {
    profileError: string;
    setProfileError: Dispatch<SetStateAction<string>>;
}

const SearchWrapper: React.FC<SearchWrapperPropsType> = ({ profileError, setProfileError }) => {


    return (
        <div className="searchWrapper">
            <Route path="/search/userInfo/" component={ProfileMenu} />
            <Route path="/search/userInfo/overview/:region" render={() => {
                return (
                    <ProfilePage setProfileError={setProfileError} profileError={profileError} />
                )
            }} />
            <Route path="/search/userInfo/masteries/:region" component={Masteries} />
        </div>
    )
}