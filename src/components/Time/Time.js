import React from 'react';

export default ({ timeString }) => {
    const createdDate = new Date(timeString);
    const formatedDate = `${createdDate.getDate()}. ${(createdDate.getMonth() + 1)}. ${createdDate.getFullYear()}`;

    return (
        <time dateTime={timeString}>{formatedDate}</time>
    )
}