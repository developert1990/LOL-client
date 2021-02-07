import { MatchedGameType } from '../types';
import { ParticipantsType } from '../types';
import { getParticipantsData } from './index';



//성공한다.
export const getSummonerMatchDetail = (games: MatchedGameType[], accountId: string) => {
    // console.log('games????????', games)

    const participantsData = getParticipantsData(games);


    let summonorMatchDetail: ParticipantsType[] = [];
    if (games) {
        const participantId = games.map((data) => data.participantIdentities.filter((data) => data.player.accountId === accountId)[0].participantId);
        // console.log("participantId ==>> ", participantId);
        summonorMatchDetail = games.map((data, index) => data.participants.filter((data) => data.stats.participantId === participantId[index])[0])
        // console.log('participantsData', participantsData)
        // console.log("매치 디테일: ", summonorMatchDetail);

        // participantsData 추가해줌
        summonorMatchDetail.map((data, index) => {
            data.otherParticipants = participantsData[index];
        });
    }
    return summonorMatchDetail;
}