import React from 'react';
import { GameImageType } from '../../types';
import { Accordion, Button } from 'react-bootstrap';
import { BasicGameInfoCard } from './BasicGameInfoCard';
import { ChampImgCard } from './index';
import { SpellsCard } from './SpellsCard';
import { RunesCard } from './RunesCard';
import { GameRecordsCard } from './GameRecordsCard';
import { ItemsCard } from './ItemsCard';
import { OtherParticipantsCard } from './OtherParticipantsCard';


interface OneGameHistoryBarPropsType {
    data: GameImageType;
}
export const OneGameHistoryBar: React.FC<OneGameHistoryBarPropsType> = ({ data }) => {
    console.log('data ==>>>>>>>>>>>>>>', data)
    return (
        <div className={`card-header ${data.gameResult === 'Victory' ? 'win' : 'lose'} `}>
            <Accordion.Toggle as={Button} variant="link" eventKey={data.gameId.toString()} className="accordion-toggle link">
                <div className="first-info">
                    <BasicGameInfoCard data={data} />
                </div>
                <div className="second-info">
                    <div className="level-champ">
                        <span className="level">{data.level}</span>
                        <ChampImgCard data={data} />
                    </div>
                    <div className="spells-runes">
                        <SpellsCard data={data} />
                        <RunesCard data={data} />
                    </div>
                </div>

                <div className="third-info">
                    <GameRecordsCard data={data} />
                </div>

                <div className="forth-info">
                    <ItemsCard data={data} />
                </div>
                <div className="fifth-info">
                    <OtherParticipantsCard otherParticipants={data.otherParticipants} />
                </div>
            </Accordion.Toggle>
        </div>
    )
}
