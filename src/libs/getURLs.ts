
import { TIER, DIVISIONS, API_BASE } from '../config/index';
export const getURLs = (region: string) => {
    console.log("유알엘 가지러 들어옴")
    const URLs = [];
    const highTier = [TIER.CHALLENGER, TIER.GRANDMASTER, TIER.MASTER];

    for (const tier of Object.values(TIER)) {
        for (const [i, division] of Object.entries(DIVISIONS)) {
            if (highTier.includes(tier) && Number(i) > 0) {
                continue;
            }
            const url = `${API_BASE}/${tier}/data?division=${division}&region=${region}`;
            URLs.push(url);
        }
    }
    return URLs;
}
