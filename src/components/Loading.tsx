// Loading spinner
import React from 'react';
import ReactLoading from 'react-loading';


export const Loading = ({ color = 'white' }) => {
    return (
        <div className="loading" data-testid="loading">
            {/* type: blank, balls, bars, bubbles, cubes, cylon, spin, spinningBubbles, spokes */}
            <ReactLoading data-testid="reactLoading" type='spokes' color={color} height={80} width={80} />
        </div>
    )
};


//Spokes, Spin