import { RuneBigType } from '../types';
import { useEffect, useState } from 'react';
import { runes } from '../data/index';

export const getRunesData = () => {
    const [allRunesData, setAllRunesData] = useState<RuneBigType[]>([]);
    useEffect(() => {
        setAllRunesData(runes);
    }, [])
    return allRunesData;
}