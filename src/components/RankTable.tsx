import React, { ChangeEvent } from 'react';
import { SummonerDetailType } from '../types';
import { Pagination } from '@material-ui/lab';
import { EmblemCard } from '../components/small_components';
import { useSelector } from 'react-redux';
import { initialAppStateType } from '../store';

interface RankTablePropsType {
    pageData: SummonerDetailType[];
    dataLimit: number;
    page: number;
    handlePageChange: (event: ChangeEvent<unknown>, page: number) => void;
}


export const RankTable: React.FC<RankTablePropsType> = ({ pageData, dataLimit, page, handlePageChange }) => {
    const { rank } = useSelector((state: initialAppStateType) => state.getRankStore);

    return (
        <div className="table_container">
            <table className="inner_table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Tier</th>
                        <th>Points</th>
                        <th>wins</th>
                        <th>losses</th>
                        <th>Rates</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        pageData.map((user, index) => {
                            const winRate = Math.round(user.wins / (user.wins + user.losses) * 100);
                            return (
                                <tr key={index} >
                                    <td>{rank.indexOf(user) + 1}</td>
                                    <td>{user.summonerName}</td>
                                    <td className="tier">
                                        <span>
                                            <EmblemCard tier={user.tier} />
                                        </span>
                                        <span className="tierName">
                                            {(user.tier).charAt(0) + (user.tier).slice(1, user.tier.length).toLowerCase()}
                                        </span>
                                    </td>
                                    <td>{user.leaguePoints}</td>
                                    <td className="wins">{user.wins}</td>
                                    <td className="losses">{user.losses}</td>
                                    <td className="rates" style={{ color: `${winRate >= 60 ? "#e19205" : null}` }}>
                                        {`${winRate}%`}
                                    </td>
                                </tr>
                            )
                        }
                        )

                    }
                </tbody>
            </table>
            <Pagination className="pagination" count={Math.ceil(rank.length / dataLimit)} color="primary" onChange={handlePageChange} page={page} />
        </div>
    )
}
