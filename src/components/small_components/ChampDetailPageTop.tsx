import React from 'react';
import { ChampDetailType } from '../../types';
import { ChampImgCard } from './ChampImgCard';
import { GAME_VERSION } from '../../config/index';
import { ChampDetailPageSpellsCard } from './ChampDetailPageSpellsCard';

export interface ChampDetailPageTopProps {
    selectedChampDetails: ChampDetailType;
}

export const ChampDetailpageTop: React.FC<ChampDetailPageTopProps> = ({ selectedChampDetails }) => {
    // console.log('selectedChampDetails', selectedChampDetails)
    return (
        <div className="champDetailPage__top">
            <ChampImgCard data={selectedChampDetails} />
            <div className="right">
                <div className="right__top">
                    <span className="name">{selectedChampDetails.name}</span>
                    <span className="title">{selectedChampDetails.title}</span>
                    <span className="version">Version - {GAME_VERSION}</span>
                </div>
                <div className="right__bottom__spells">
                    <ChampDetailPageSpellsCard spells={selectedChampDetails.spells} passive={selectedChampDetails.passive} />
                </div>
            </div>
        </div>
    )
}
