import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { initialAppStateType } from '../store';
import { SummonerReduxtype } from '../types';


interface UserMenuBarPropsType {
    summonerInfo: SummonerReduxtype | undefined;
}

export const UserMenuBar: React.FC<UserMenuBarPropsType> = ({ summonerInfo }) => {

    const regionStore = useSelector((state: initialAppStateType) => state.regionStore);
    const { region } = regionStore;

    return (
        <div className="summoner_menu">
            <div className="user-nav">
                <Link className="link" to={`/search/userInfo/overview/${region}?name=${summonerInfo?.name}/`}>
                    <span className='span'>Overview</span>
                </Link>
                <Link className="link" to={`/search/userInfo/masteries/${region}?name=${summonerInfo?.name}`}>
                    <span className='span'>Masteries</span>
                </Link>
                <Link className="link" to={
                    {
                        pathname: '/search/userInfo/userInGame',
                        // state: {
                        //     gameIdInfo: gameIds,
                        //     accountId: accountId,
                        // }
                    }}><span className='span'>In Game</span></Link>

            </div>
        </div>
    )
}
