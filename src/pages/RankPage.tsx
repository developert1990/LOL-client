import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getURLs } from '../libs';
import { initialAppStateType } from '../store';
import { SummonerDetailType } from '../types';

import { getRankAction } from '../actions/getRankAction';
import { Loading } from '../components/Loading';
import { RankTable } from '../components';
import { RANKING_RESET } from '../constants/getRankConstants';

let rankArr: SummonerDetailType[] = [];

export const RankPage = () => {
    const { region } = useSelector((state: initialAppStateType) => state.regionStore);
    const { error, isLoading, rank } = useSelector((state: initialAppStateType) => state.getRankStore);

    const dispatch = useDispatch();

    const [urlCount, setUrlCount] = useState(0);
    const [urls, setUrls] = useState<string[]>([]);
    const [pageData, setPageData] = useState<SummonerDetailType[]>([]);
    const [page, setPage] = useState<number>(1);
    const dataLimit = 20;
    const indexOfLast = page * dataLimit;
    const indexOfFirst = indexOfLast - dataLimit;

    const handlePageChange: any = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);

        // 클릭한 곳이 현재 페이
        if (Math.floor(rank.length / dataLimit) - 5 <= page) {
            setUrlCount(urlCount + 1);
        }

        if (Math.floor(rank.length / dataLimit) - 4 <= page) {
            dispatch(getRankAction(urls, urlCount, rankArr));
        }
    }
    useEffect(() => {
        if (rank) {
            // setPageData(createdReviews.slice(0, 4) as reviewType[]); // 0 2 , 1 3, 2 4           0 2 , 2 4, 4 6 
            // 우선 먼저 sort 를 해서 순서를 바꿔주고 slice 로 data를 나눠준다.
            setPageData(rank.slice(indexOfFirst, indexOfLast)); // 0 2 , 1 3, 2 4           0 2 , 2 4, 4 6 
        }
    }, [indexOfFirst, indexOfLast, rank])



    useEffect(() => {

        if (urls.length === 0) {
            console.log('urls', urls)
            setUrls(getURLs(region));
        }
    }, []);

    useEffect(() => {
        // 맨처음 랜더 된다, 리전을 바꿀때도 rank길이도 0 이되고 url도 다시 받아오기때문에 이곳이 랜더 된다.
        if (urls.length > 0 && rank.length === 0) {
            rankArr = [];
            dispatch(getRankAction(urls, urlCount, rankArr));
        }
    }, [urls, urlCount])

    useEffect(() => {
        // reset initial data when region is changed.
        setUrls(getURLs(region));
        setUrlCount(0);
        dispatch({ type: RANKING_RESET });
    }, [region])

    return (
        <div className="rank-page">
            <div className="rankPage_title">Ranking</div>
            {
                isLoading && rank.length === 0 ?
                    <Loading /> :

                    <RankTable pageData={pageData} dataLimit={dataLimit} page={page} handlePageChange={handlePageChange} />
            }
        </div>
    )
}
