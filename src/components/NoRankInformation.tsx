import React from 'react';
import { ErrorType } from '../reducers/types';


export const NoRankInformation = ({ hasError }: { hasError: ErrorType | null }) => {
    return hasError ? <div style={{ color: "red" }}>{hasError.message}</div> : null;
}