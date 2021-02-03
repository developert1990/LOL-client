// 게임 시간 뽑아내는 함수
export const getPlayDuration = (duration: number) => {
    if (duration >= 3600) {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration - 3600) / 60);
        const seconds = duration - 3600 - (minutes * 60);
        return (
            `${hours === 1 ? hours + ' hour' : hours + ' hours'} ${minutes === 1 ? minutes + ' min' : minutes + ' mins'} ${seconds === 1 || seconds === 0 ? seconds + ' sec' : seconds + ' secs'}`
        )
    } else {
        const minutes = Math.floor(duration / 60);
        const seconds = duration - (minutes * 60);
        return (
            ` ${minutes === 1 ? minutes + ' min' : minutes + ' mins'} ${seconds === 1 || seconds === 0 ? seconds + ' sec' : seconds + ' secs'}`
        )
    }
}