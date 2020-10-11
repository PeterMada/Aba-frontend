import React from 'react';

import cS from './NiceTitle.module.scss';

export default ({ title, subtitle, text }) => {
    return (
        <div className={text?.length > 0 ? `${cS.wrap}` : `${cS.wrap} ${cS.noPerex}`}>
            <div className={cS.wrapInner}>
                <h1 className={cS.title}>{title}</h1>

                <p className={cS.subtitle}>{subtitle}</p>
            </div>
            {text?.length > 0 &&
                <p className={cS.text}>{text}</p>
            }
        </div>
    )
}