import React, { useEffect, useState } from 'react';
import { getMasteries } from '../libs/index';
import { useSelector } from 'react-redux'
import { initialAppStateType } from '../store'
import { MasteriesType } from '../types';



import { Loading } from './Loading';
import { ChampImgCard, SummonerDetailCard } from './small_components';





export const Masteries = () => {
    const { summonerInfo } = useSelector((state: initialAppStateType) => state.getSummonerStore);
    const { region } = useSelector((state: initialAppStateType) => state.regionStore);
    const { summonerDetail } = useSelector((state: initialAppStateType) => state.getSummonerDetailStore);
    const [summonermastery, setSummonermastery] = useState<MasteriesType[] | undefined>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        (
            async () => {
                const summonerMasteries = summonerInfo && await getMasteries(summonerInfo, region);
                setSummonermastery(summonerMasteries);
                setIsLoading(false);
            }
        )();
    }, [])

    const setLevelColor = (level: number) => {
        if (level >= 3 && level <= 5) {
            return "#2daf7f";
        } else if (level > 5) {
            return "#e19205";
        } else {
            return "";
        }
    }


    return (
        <div className="masteryPage mainInfoWrapper">
            <div className="summoner_info_bottom">
                {summonerDetail &&
                    <div className="summoner_info_bottom_left">
                        <SummonerDetailCard summonerDetail={summonerDetail} />
                    </div>
                }
                {
                    isLoading ?
                        <Loading /> :
                        summonermastery && summonermastery.length > 0 &&
                        <div className="masteries_table_container ">
                            <table>
                                <thead className="mastery_th">
                                    <tr className="th_tr">
                                        <td className="th_td mastery_Rank">Rank</td>
                                        <td className="th_td mastery_Champion">Champion</td>
                                        <td className="th_td mastery_Level">Level</td>
                                        <td className="th_td mastery_Level">PointsSinceLastLevel</td>
                                        <td className="th_td mastery_Points">Points</td>
                                        <td className="th_td mastery_Token">Token</td>
                                    </tr>
                                </thead>
                                <tbody className="mastery_tb">
                                    {
                                        summonermastery?.map((data: MasteriesType, index: number) => {
                                            return (
                                                <tr className="tb_tr" key={index} style={{ backgroundColor: `${index % 2 === 0 ? "#11112A" : null}` }}>
                                                    <td className="tb_td mastery_index">{index + 1}</td>
                                                    <td className="tb_td mastery_champImgAndID">
                                                        <ChampImgCard data={data} />
                                                        <span className="mastery_championId">{data.championId}</span>
                                                    </td>
                                                    <td className="tb_td mastery_championLevel" style={{ color: `${setLevelColor(data.championLevel)}` }}>{data.championLevel}</td>
                                                    <td className="tb_td mastery_championPoints">{data.championPointsSinceLastLevel.toLocaleString()}</td>
                                                    <td className="tb_td mastery_championPoints">{data.championPoints.toLocaleString()}</td>
                                                    <td className="tb_td mastery_tokensEarned">{data.tokensEarned}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                }
            </div>
        </div>
    )
}
