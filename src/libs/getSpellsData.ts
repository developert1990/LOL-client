import { SpellDetailType } from '../types';
import { useEffect, useState } from 'react';
import { spells } from '../data/index';



interface hardCodingSpellType {
    "SummonerBarrier": SpellDetailType;
    "SummonerBoost": SpellDetailType;
    "SummonerDot": SpellDetailType;
    "SummonerExhaust": SpellDetailType;
    "SummonerFlash": SpellDetailType;
    "SummonerHaste": SpellDetailType;
    "SummonerHeal": SpellDetailType;
    "SummonerMana": SpellDetailType;
    "SummonerPoroRecall": SpellDetailType;
    "SummonerPoroThrow": SpellDetailType;
    "SummonerSmite": SpellDetailType;
    "SummonerSnowURFSnowball_Mark": SpellDetailType;
    "SummonerSnowball": SpellDetailType;
    "SummonerTeleport": SpellDetailType;
}

interface SpellsType { [key: string]: SpellDetailType }; // 위에 선언한거랑 같은거임

export const getSpellsData = () => {
    const spellsData: SpellsType = spells // 이렇게 타입 안줘도 실행 되긴 하더라..

    const allSpellsData: SpellDetailType[] = Object.values(spellsData);
    return allSpellsData;
}



