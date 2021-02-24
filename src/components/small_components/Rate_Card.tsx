import React from 'react';

interface Rate_CardPropsType {
    kills?: number;
    assists?: number;
    deaths?: number;
    rate?: number;
}
export const Rate_Card: React.FC<Rate_CardPropsType> = ({ deaths, kills, assists, rate }) => {

    const rateColor = (rate: number) => {
        if (rate >= 3 && rate < 5) {
            return "#2daf7f"
        } else if (rate >= 5) {
            return "#e19205"
        } else {
            return "";
        }
    }

    return (
        <>
            {
                kills !== undefined && assists !== undefined && deaths !== undefined
                    ?
                    <span style={{ color: rateColor((kills + assists) / deaths) }}>
                        {`${((kills + assists) / deaths).toFixed(2)}` === 'Infinity' ? 'Perfect' : `${((kills + assists) / deaths).toFixed(2)}`}
                    </span>
                    :
                    <span className="rate" style={{ color: rateColor(Number(rate)) }}>{rate}</span>
            }
        </>
    )
}
