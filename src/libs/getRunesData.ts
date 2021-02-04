import { RuneBigType } from '../types';
import { runes } from '../data/index';

export const getRunesData = () => {
    const allRunesData: RuneBigType[] = runes;
    return allRunesData;
}