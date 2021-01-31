import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getSummoner } from '../actions/getSummonerAction';
import { initialAppStateType } from '../store';

export const UserMenuBar = () => {

    const regionStore = useSelector((state: initialAppStateType) => state.regionStore);
    const { region } = regionStore;
    const getSummonerStore = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { isLoading: getSummonerIsLoading, error, summonerInfo } = getSummonerStore;
    const dispatch = useDispatch();
    console.log('summonerInfo 메뉴바 페이지', summonerInfo);


    // useEffect(() => {
    //     dispatch(getSummoner())
    // },[])
    return (
        <div className="user-nav">
            {/* {console.log(id)} */}
            <Link className="link" to={
                {
                    pathname: `/search/userInfo/overview/${region}?name=${summonerInfo?.name}/`,
                    // state: {
                    //     gameIdInfo: gameIds,
                    //     accountId: accountId,
                    // }
                }}><span className='span'>Overview</span></Link>
            <Link className="link" to={
                {
                    pathname: `/search/userInfo/masteries/${region}?name=${summonerInfo?.name}`,
                    // state: {
                    //     gameIdInfo: gameIds,
                    //     accountId: accountId,
                    // }
                }}><span className='span'>Masteries</span></Link>
            <Link className="link" to={
                {
                    pathname: '/search/userInfo/userInGame',
                    // state: {
                    //     gameIdInfo: gameIds,
                    //     accountId: accountId,
                    // }
                }}><span className='span'>In Game</span></Link>

        </div>
    )
}
