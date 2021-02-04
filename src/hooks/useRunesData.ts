import { RuneBigType } from './../types.d';
import { useEffect, useState } from 'react';
import { runes } from '../data/index';

export const useRunesData = () => {
    const [allRunesData, setAllRunesData] = useState<RuneBigType[]>([]);
    useEffect(() => {
        setAllRunesData(runes);
    }, [])
    return allRunesData;
}