
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRotationChamp } from '../libs';
import { initialAppStateType } from '../store';
import { RotationChampType, RotationChampResultType, RotationChampEachType } from '../types';
import { ChampionRotationCardView } from './ChampionRotationCardView';
import { ChampImgCard } from './small_components';

export const ChampionRotationCard = () => {
    const { region } = useSelector((state: initialAppStateType) => state.regionStore);
    const [rotateChampObj, setRotateChampObj] = useState<RotationChampResultType>();
    useEffect(() => {
        (
            async () => {
                const rotationChampResult: RotationChampResultType = await getRotationChamp(region);
                setRotateChampObj(rotationChampResult);
            }
        )();
    }, [])


    return (
        <>
            {rotateChampObj &&
                <div className="ChampionRotationCard">
                    <div className="freeRotation">
                        <div className="freeChamp__title">Free Champions</div>
                        <div className="freeChamps">
                            {
                                rotateChampObj.freeChampForAll.map((champ, index) =>
                                    <div className="freeChamp_container" key={index}>
                                        <ChampionRotationCardView champ={champ} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="freeRotation">
                        <div className="freeChamp__title">Free Champions For New Summoners</div>
                        <div className="freeChamps">
                            {
                                rotateChampObj.freeChampForNew.map((champ, index) =>
                                    <div className="freeChamp_container" key={index}>
                                        <ChampionRotationCardView champ={champ} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}




    // useEffect(() => {
    //     (
    //         async () => {
    //             const { data } = await axios.get(`${API.GET_CHAMP_ROTATION}?region=${region}`);
    //             console.log('data??? ', data)
    //         }
    //     )();
    // }, [])