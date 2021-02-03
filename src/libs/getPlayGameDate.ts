// 게임 언제 했는지 뽑아내는 함수
export const getPlayGameDate = (unixTime: number) => {
    const timeGap: number = Number(new Date()) - unixTime;
    let stime = timeGap / 1000;
    const year = 86400 * (365.25);
    const month = 86400 * 30.4375;
    const day = 86400;
    const hour = 3600;
    const min = 60;

    if (stime >= year) return (`${stime / year === 1 ? `${(stime / year).toFixed(0)} year ago` : `${(stime / year).toFixed(0)} years ago`}`);
    if (stime >= month) return (`${stime / month === 1 ? `${(stime / month).toFixed(0)} month ago` : `${(stime / month).toFixed(0)} months ago`}`);
    if (stime >= day) return (`${stime / day === 1 ? `${(stime / day).toFixed(0)} day ago` : `${(stime / day).toFixed(0)} days ago`}`);
    if (stime >= hour) return (`${stime / hour === 1 ? `${(stime / hour).toFixed(0)} hour ago` : `${(stime / hour).toFixed(0)} hours ago`}`);
    return (stime / min).toFixed(0) + "minutes ago";
}