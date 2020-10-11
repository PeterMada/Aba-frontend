import React from 'react';

import { Link } from 'gatsby';
import Img from 'gatsby-image';

import HeaderMenu from './HeaderMenu';

import cS from './Header.module.scss';

export default ({ blockData, siteUrlMap, siteMenu }) => {

    return (
        <header className={cS.wrap}>
            <div className={cS.wrapInner}>
                <Link to='/' className={cS.logo}>
                    <Img fluid={blockData.SiteLogo.childImageSharp.fluid} />
                </Link>
                <HeaderMenu blockData={siteMenu} siteUrlMap={siteUrlMap} className={cS.menu} />
            </div>
        </header>
    );
}