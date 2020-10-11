import React from 'react';

import cS from './MenuButton.module.scss'

export default () => {
    return (
        <div className={cS.menuButton}>
            <div className={cS.menuBar1}></div>
            <div className={cS.menuBar2}></div>
            <div className={cS.menuBar3}></div>
        </div>
    )
}