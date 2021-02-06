import React from 'react';
import { API } from '../../config';
import { GameImageType } from '../../types';
import darkgery from '../../images/darkgrey.png';

interface ItemsCardPropsType {
    data: GameImageType;
}

export const ItemsCard: React.FC<ItemsCardPropsType> = ({ data }) => {
    return (
        <>
            <div>
                {data.item0 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item0}.png`} alt="images" /></span>}
                {data.item1 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item1}.png`} alt="images" /></span>}
                {data.item2 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item2}.png`} alt="images" /></span>}
            </div>
            <div>
                {data.item3 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item3}.png`} alt="images" /></span>}
                {data.item4 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item4}.png`} alt="images" /></span>}
                {data.item5 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span> <img className="item" src={`${API.GET_ITEMS_IMG}/${data.item5}.png`} alt="images" /></span>}
                {data.item6 === 0 ? <span><img className="item" src={darkgery} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item6}.png`} alt="images" /></span>}
            </div>
        </>
    )
}
