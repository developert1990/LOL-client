
import React from 'react';
import { useSelector } from 'react-redux';
import { ErrorType } from '../reducers/types';
import { initialAppStateType } from '../store';
import { SummonerReduxtype } from '../types';
import { Loading } from './Loading';
import { SummonerProfileCard } from './small_components';
import { UserMenuBar } from './UserMenuBar';

interface SummonerErrorProps {
    error?: ErrorType | null;
}

interface SummonerInfoProps {
    summonerInfo?: SummonerReduxtype;
}

const SummonerError: React.FC<SummonerErrorProps> = ({ error }) => {
    const checkError = error?.status ? error?.status.message : error?.message;
    return (
        <div style={{ color: "red" }} className="summoner-error">
            <div>{checkError}</div>
        </div>
    )
}

const SummonerInfo: React.FC<SummonerInfoProps> = ({ summonerInfo }) => {
    return (
        <div className="summoner_info_top">
            <SummonerProfileCard summonerInfo={summonerInfo} />
            <UserMenuBar summonerInfo={summonerInfo} />
        </div>
    )
}

export const ProfileMenu = () => {
    const { isLoading, error, summonerInfo } = useSelector((state: initialAppStateType) => state.getSummonerStore);

    // const dispatch = useDispatch();
    // const query: {
    //     [key: string]: string;
    // } = useQuery();


    const renderSummonerInfo = () => {
        const hasError = error && !summonerInfo;
        return (
            hasError ? <SummonerError error={error} /> : <SummonerInfo summonerInfo={summonerInfo} />
        )
    }

    return (
        isLoading ?
            <Loading /> :
            renderSummonerInfo()
    )
}
