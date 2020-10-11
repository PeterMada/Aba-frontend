import React from 'react';

import cS from './MaxWidthWrap.module.scss';

export default ({ children, smallerWidth = false }) => {
    return (
        <div className={smallerWidth ? `${cS.wrapSmaller} ${cS.wrap}` : `${cS.wrapBig} ${cS.wrap}`}>
            {children}
        </div>
    )
}