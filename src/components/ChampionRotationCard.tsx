
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRotationChamp } from '../libs';
import { initialAppStateType } from '../store';
import { RotationChampResultType } from '../types';
import { ChampionRotationCardView } from './ChampionRotationCardView';

export const ChampionRotationCard = () => {
    const { region } = useSelector((state: initialAppStateType) => state.regionStore);
    const [rotateChampObj, setRotateChampObj] = useState<RotationChampResultType>();
    useEffect(() => {
        (
            async () => {
                const rotationChampResult = await getRotationChamp(region);
                setRotateChampObj(rotationChampResult);
            }
        )();
    }, [region])


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