import { MatchedGameType } from '../types';
import { ParticipantsType } from '../types';




export const getSummonerMatchDetail = (games: MatchedGameType[], accountId: string) => {

    let summonorMatchDetail: ParticipantsType[] = [];
    if (games) {
        const participantId = games.map((data) => data.participantIdentities.filter((data) => data.player.accountId === accountId)[0].participantId);
        // console.log("participantId ==>> ", participantId);
        summonorMatchDetail = games.map((data, index) => data.participants.filter((data) => data.stats.participantId === participantId[index])[0])
        // console.log("매치 디테일: ", summonorMatchDetail);
    }
    return summonorMatchDetail;
}