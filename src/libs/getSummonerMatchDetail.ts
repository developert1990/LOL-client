import { MatchedGameType } from '../types';
import { ParticipantsType } from '../types';
import { getParticipantsData } from './index';



//성공한다.
export const getSummonerMatchDetail = async (games: MatchedGameType[], accountId: string, region: string) => {
    const participantsData = await getParticipantsData(games, region);

    let summonorMatchDetail: ParticipantsType[] = [];
    if (games) {
        const participantId = games.map((data) => data.participantIdentities.filter((data) => data.player.accountId === accountId)[0].participantId);
        summonorMatchDetail = games.map((data, index) => data.participants.filter((data) => data.stats.participantId === participantId[index])[0])

        // participantsData 추가해줌
        summonorMatchDetail.map((data, index) => {
            return data.otherParticipants = participantsData[index];
        });
    }
    return summonorMatchDetail;
}