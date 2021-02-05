


import React, { useState } from 'react';
import { useEffect } from 'react';
import { API } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { Accordion, Button } from 'react-bootstrap';
import { MatchedGameDetail } from './MatchedGameDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loading } from './Loading';
import { initialAppStateType } from '../store';
import { GameImageType } from '../types';
import darkgery from '../images/darkgrey.png';
import { getPlayGameDate, getPlayDuration } from '../libs/index';
import { getChampsData, getRunesData, getSpellsData } from '../libs/index';
import { getGameDetail } from '../actions/getGameDetailAction';
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
    gameIdInfo: number[];
    accountId: string;
    id: string;


}




const UserMatchHistory: React.FC<UserMatchHistoryPropsType> = ({ accountId, gameIdInfo, id }) => {
    console.log("유즈메치히스토리 렌더 하러 들어옴")
    const regionStore = useSelector((state: initialAppStateType) => state.regionStore);
    const { region } = regionStore;

    const getGamesDetailStore = useSelector((state: initialAppStateType) => state.getGameDetailStore);
    const { error, games, isLoading: gamesDetailLoading, detailedImageData, summonerMatchDetail } = getGamesDetailStore;




    // 커스텀훅을 리덕스 내부에서 사용불가능 해서 일반 함수호출로 바꿔줫음
    const allChampsData = getChampsData();
    const allSpellsData = getSpellsData();
    const allRunesData = getRunesData();


    const [information, setInformation] = useState<GameImageType[]>([]);
    // let information: GameImageType[] = [];

    const isInitialLoading = gamesDetailLoading && information.length === 0;
    const [start, setStart] = useState(0);
    const [loadMore, setLoadMore] = useState(false);


    const dispatch = useDispatch();
    useEffect(() => {
        if (allChampsData.length > 0) {
            dispatch(getGameDetail(start, gameIdInfo, region, accountId));
        }
    }, [start])


    useEffect(() => {
        setInformation([...information, ...detailedImageData]);
        setLoadMore(false);
    }, [detailedImageData])


    const handleStartClicked = () => {
        setLoadMore(true);
        setStart(start + 3);
    }


    return (
        <>
            <div className={gamesDetailLoading ? 'laoding-page' : 'matchHistory-page'}>
                {
                    isInitialLoading ? // information.lenght 가 0 이라는 조건을 추가해서 맨처음에만 로딩을 띄우게 만들어주었다.
                        <div className="loading" >
                            <Loading />
                        </div>
                        :
                        <div>
                            {
                                information.map((data, index) => {
                                    return (
                                        <div className="accordion-page" key={index}>
                                            {/* {console.log('information 추가하고 난다음~~~~~~~~~~~~~~~~~~~~~~', information)} */}
                                            <Accordion key={index} className="accordion">
                                                <div className="card">
                                                    <div className={`card-header ${data.gameResult === 'Victory' ? 'win' : 'lose'} `}>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey={data.gameId.toString()} className="accordion-toggle link">
                                                            <div className="first-info">
                                                                {/* {console.log('getPlayGameDate(data.createdGame) ==>> ', getPlayGameDate(data.createdGame))} */}
                                                                <span className="created-game">{getPlayGameDate(data.createdGame)}</span>
                                                                <span className="game-duration">{getPlayDuration(data.gameDuration)}</span>
                                                                <span className={`game-result ${data.gameResult === "Win" ? 'win_text' : 'lose_text'}`}>{data.gameResult}</span>
                                                            </div>
                                                            <div className="second-info">
                                                                <div className="level-champ">
                                                                    <span className="level">{data.level}</span>
                                                                    <img className="champ-image" src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.champImage}`} alt="images" />
                                                                </div>
                                                                <div className="spells-runes">
                                                                    <div className="spells">
                                                                        <span><img className="spell" src={`${API.GET_SPELLS_IMG}/${data.spell1}.png`} alt="images" /></span>
                                                                        <span><img className="spell" src={`${API.GET_SPELLS_IMG}/${data.spell2}.png`} alt="images" /></span>
                                                                    </div>
                                                                    <div className="runes">
                                                                        <span><img className="rune" src={`${API.GET_RUNES_IMG}/${data.mainRune}`} alt="images" /></span>
                                                                        <span><img className="rune" src={`${API.GET_RUNES_IMG}/${data.subRune}`} alt="images" /></span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="third-info">
                                                                <span className="gold">{data.gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} G</span> {/* 골드 세칸당 콤마(,) 찍는 함수 */}
                                                                <span className="rate">{data.rate}</span>
                                                                <div className="kda">
                                                                    <span className="kills">{data.kills}</span> / <span className="deaths">{data.deaths}</span> / <span className="assists">{data.deaths}</span>
                                                                </div>
                                                                <span className="cs">{data.minionKillded} ({`${(data.minionKillded / 60).toFixed(1)}`}) CS</span>
                                                            </div>

                                                            <div className="forth-info">
                                                                <div>
                                                                    {data.item0 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item0}.png`} alt="images" /></span>}
                                                                    {data.item1 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item1}.png`} alt="images" /></span>}
                                                                    {data.item2 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item2}.png`} alt="images" /></span>}
                                                                </div>
                                                                <div>
                                                                    {data.item3 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item3}.png`} alt="images" /></span>}
                                                                    {data.item4 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item4}.png`} alt="images" /></span>}
                                                                    {data.item5 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span> <img className="item" src={`${API.GET_ITEMS_IMG}/${data.item5}.png`} alt="images" /></span>}
                                                                    {data.item6 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item6}.png`} alt="images" /></span>}
                                                                </div>
                                                            </div>
                                                        </Accordion.Toggle>
                                                    </div>
                                                    <Accordion.Collapse eventKey={data.gameId.toString()}>

                                                        <div className="card-body"><MatchedGameDetail clickedData={data} games={games[index]} allChampsData={allChampsData} allSpellsData={allSpellsData} allRunesData={allRunesData} /></div>

                                                    </Accordion.Collapse>
                                                </div>

                                            </Accordion>

                                        </div>

                                    )

                                }
                                )
                            }

                            <div className="load-data-button">
                                {loadMore ? <Loading /> : <button className="load-button" onClick={() => handleStartClicked()}>button</button>}

                            </div>

                        </div>

                }
            </div>

        </>
    )
}

export default React.memo(UserMatchHistory);