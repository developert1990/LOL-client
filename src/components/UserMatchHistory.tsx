


import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { Accordion, Button } from 'react-bootstrap';
import { MatchedGameDetail } from './MatchedGameDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loading } from './Loading';
import { initialAppStateType } from '../store';
import { GameImageType } from '../types';
import { getChampsData, getRunesData, getSpellsData } from '../libs/index';
import { OneGameHistoryBar } from './small_components/index';
export interface LocationType {
    gameIdInfo: number[];
    accountId: string;
    id: string;
}

export interface SpellsStringType {
    spell1: string;
    spell2: string;
}

export interface UserMatchHistoryPropsType {
    setStart: Dispatch<SetStateAction<number>>;
    start: number;
    information: GameImageType[];
    loadMore: boolean;
    setLoadMore: Dispatch<SetStateAction<boolean>>;
}




const UserMatchHistory: React.FC<UserMatchHistoryPropsType> = ({ setStart, start, information, loadMore, setLoadMore }) => {
    console.log("유즈메치히스토리 렌더 하러 들어옴")

    const getGamesDetailStore = useSelector((state: initialAppStateType) => state.getGameDetailStore);
    const { error: gamesDetailError, games, isLoading: gamesDetailLoading, detailedImageData, summonerMatchDetail } = getGamesDetailStore;


    // 커스텀훅을 리덕스 내부에서 사용불가능 해서 일반 함수호출로 바꿔줫음
    const allChampsData = getChampsData();
    const allSpellsData = getSpellsData();
    const allRunesData = getRunesData();


    const handleStartClicked = () => {
        setLoadMore(true);
        setStart(start + 3);
    }


    return (
        <>
            <div className={gamesDetailLoading ? 'laoding-page' : 'matchHistory-page'}>

                <div>
                    {
                        information.map((data, index) => {
                            return (
                                <div className="accordion-page" key={index}>
                                    {console.log('information ==>>>>>', information)}
                                    {console.log('games=== >>> ', games)}
                                    <Accordion key={index} className="accordion">
                                        <div className="card">
                                            <OneGameHistoryBar data={data} />
                                            <Accordion.Collapse eventKey={data.gameId.toString()}>
                                                <div className="card-body">
                                                    <MatchedGameDetail
                                                        clickedData={data} games={games[index]} allChampsData={allChampsData}
                                                        allSpellsData={allSpellsData} allRunesData={allRunesData}
                                                    />
                                                </div>
                                            </Accordion.Collapse>
                                        </div>
                                    </Accordion>
                                </div>
                            )
                        })
                    }

                    <div className="load-data-button">
                        {loadMore ? <Loading /> : <Button style={{
                            width: "98%",
                            color: "white",
                            borderRadius: "10px",
                            padding: "5px",
                        }} className="load-button" onClick={() => handleStartClicked()}>button</Button>}

                    </div>

                </div>


            </div>

        </>
    )
}

export default React.memo(UserMatchHistory);