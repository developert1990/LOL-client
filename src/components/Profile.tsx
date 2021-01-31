import React from 'react';
import { API } from '../config';

export interface ProfilePropsType {
    profileIconId: number;
    level: number;
    name: string;
}

export const Profile: React.FC<ProfilePropsType> = ({ level, name, profileIconId }) => {
    return (
        <div className="logo-name-link link">
            <img className="logo-img" src={`${API.GET_PROFILEICON}/${profileIconId}.png`} alt="profileIcon" />
            <span className="level">{level}</span>
            <span className="name">{name}</span>
        </div>
    )
}
