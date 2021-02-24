import React from 'react';
import { API } from '../../config';
import { GameImageType } from '../../types';
import darkgery from '../../images/darkgrey.png';

interface ItemsCardPropsType {
    data: GameImageType;
}

export const ItemsCard: React.FC<ItemsCardPropsType> = ({ data }) => {
    const item0 = data.item0 ? data.item0 : data.stats?.item0;
    const item1 = data.item1 ? data.item1 : data.stats?.item1;
    const item2 = data.item2 ? data.item2 : data.stats?.item2;
    const item3 = data.item3 ? data.item3 : data.stats?.item3;
    const item4 = data.item4 ? data.item4 : data.stats?.item4;
    const item5 = data.item5 ? data.item5 : data.stats?.item5;
    const item6 = data.item6 ? data.item6 : data.stats?.item6;

    return (
        <div className="items__card">
            {item0 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${item0}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" /></span>}
            {item1 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${item1}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" /></span>}
            {item2 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${item2}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" /></span>}
            {item3 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${item3}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" /></span>}
            {item4 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${item4}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" /></span>}
            {item5 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span> <img className="item" src={`${API.GET_ITEMS_IMG}/${item5}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" /></span>}
            {item6 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${item6}.png`} onError={(e: any) => e.target.style.display = 'none'} alt="images" /></span>}
        </div>
    )
}
