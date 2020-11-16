import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import HeaderMenu from './HeaderMenu';

import cS from './Header.module.scss';

export default ({ blockData, siteUrlMap, siteMenu }) => {
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 80);
        });
    }, []);

    //<Img fluid={blockData.SiteLogo.childImageSharp.fluid} />

    return (
        <header className={scroll ? `${cS.wrap} ${cS.isScrolled} header-wrap` : `${cS.wrap} header-wrap`}>
            <div className={cS.wrapInner}>
                <Link to='/' className={cS.logo}>
                    <img className={cS.logoImg} src={blockData.SiteLogo.publicURL} alt={blockData.SiteName} />
                </Link>
                <HeaderMenu blockData={siteMenu} siteUrlMap={siteUrlMap} className={cS.menu} />
            </div>
        </header >
    );
}