import React from 'react';
import { Link } from 'react-router-dom';
import { ChampImgCard } from '../components/small_components';
import { getChampsData } from '../libs';

export const ChampionsPage = () => {
    const allChamps = getChampsData();
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
