import React from 'react';

import Header from '../Header/Header';

import './RootLayout.scss';

export default ({ children, siteData, siteUrlMap, siteMenu }) => {

    return (
        <>
            <Header blockData={siteData} siteUrlMap={siteUrlMap} siteMenu={siteMenu} />
            <div>{children}</div>
        </>
    )
}