
import React, { Dispatch, SetStateAction } from 'react'
import { Loading } from '../components/Loading';
import UserMatchHistory from '../components/UserMatchHistory';
import { GameImageType, SummonerDetailType } from '../types';
import { HistoryGraphCard, SummonerDetailCard } from '../components/small_components/index';


interface ProfilePagePropsType {
    summonerDetail: SummonerDetailType;
    getSummonerDetailLoading: boolean;
    information: GameImageType[];
    start: number;
    setStart: Dispatch<SetStateAction<number>>;
    setLoadMore: Dispatch<SetStateAction<boolean>>;
    loadMore: boolean;
}

interface CheckHistoryPropsType {
    information: GameImageType[];
    start: number;
    setStart: Dispatch<SetStateAction<number>>;
    setLoadMore: Dispatch<SetStateAction<boolean>>;
    loadMore: boolean;
}

const CheckHistory: React.FC<CheckHistoryPropsType> = ({ information, loadMore, setLoadMore, setStart, start }) => {
    return (
        information.length === 0 ?
            <Loading /> :
            <UserMatchHistory
                setStart={setStart} start={start} information={information} loadMore={loadMore} setLoadMore={setLoadMore}
            />
    )
}

export const ProfilePage: React.FC<ProfilePagePropsType> = ({ summonerDetail, getSummonerDetailLoading, loadMore, information, setStart, setLoadMore, start }) => {


    return (
        <div className="summoner-info mainInfoWrapper">
            {
                !summonerDetail && getSummonerDetailLoading ?
                    <Loading /> : (
                        <div className="summoner_info_bottom">

                            <div className="summoner_info_bottom_left">
                                <SummonerDetailCard summonerDetail={summonerDetail} />
                                <HistoryGraphCard />
                            </div>

                            <div className="summoner_info_bottom_right">
                                {
                                    <CheckHistory setStart={setStart} start={start} information={information} loadMore={loadMore} setLoadMore={setLoadMore} />

                                }
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
