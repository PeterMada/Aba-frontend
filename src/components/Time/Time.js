import React from 'react';

// TODO #1 @PeterMada
export const Time = ({ timeString = false }) => {
    const date = new Date(timeString);
    const finalDate = timeString ?
        <time>{`${date.getDate()}. ${(date.getMonth() + 1)}. ${date.getFullYear()}`}</time> : '';

    return finalDate;
};