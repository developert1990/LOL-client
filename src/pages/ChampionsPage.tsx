import React from 'react';
import { Link } from 'react-router-dom';
import { ChampImgCard } from '../components/small_components';
import champs from '../data/allChamps.json';
import { ChampDetailType } from '../types';

export const ChampionsPage = () => {
    const typedAllChamps: any = champs;
    const allChamps: ChampDetailType[] = Object.values(typedAllChamps.data);
    // const test = getChampsData();
    return (
        <div className="championsPage">
            <div className="championsPage_title">
                LoL Champions
            </div>
            <div className="championsPage_container">
                {

                    allChamps.map((champ, index: number) => {
                        return (

                            <Link className="champion_item" key={index} to={{
                                pathname: `/champions/detail/?champion=${champ.id}`,

                            }}>
                                <div className="image_wrapper">
                                    <ChampImgCard data={champ} />
                                </div>
                                <div className="champion_name">{champ.name}</div>
                            </Link>

                        )
                    })
                }
            </div>
        </div>
    )
}
