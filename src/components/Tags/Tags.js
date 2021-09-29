import React from 'react';

import MaxWidthWrap from '../MaxWidthWrap/MaxWidthWrap';

export default ({ allTags, activeTag }) => {
    console.log('ABCDEF');
    console.log(allTags);
    console.log(activeTag);

    return (
        <MaxWidthWrap>
            <div>
                {allTags.map(el => {
                    if (el !== 'Test') {
                        return (
                            <button key={el}>{el}</button>
                        );
                    }
                })}
            </div>
        </MaxWidthWrap>

    )
}