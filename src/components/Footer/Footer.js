import React from 'react';

import { Link } from 'gatsby';
import Img from 'gatsby-image';

import FooterMenu from './FooterMenu';
import SocialMediaSite from './../SocialMediaSite/SocialMediaSite';

import cS from './Footer.module.scss';

export default ({ blockData, menuData, siteUrlMap, socialSites }) => {
    // TODO #1 Link has wrong url
    return (
        <footer className={cS.footerWrapOuter}>
            <div className={cS.footerWrap}>
                <div className={cS.footerColumn__logo} >
                    <Link
                        to='/' alt={blockData.SiteName}
                        className={cS.logoLink} >
                        <Img
                            fluid={blockData.SiteLogo.childImageSharp.fluid}
                            className={cS.logo}
                        />
                    </Link>

                    <ul className={cS.social}>
                        {socialSites.map((socSit, index) => (
                            <li
                                key={index}
                                className={cS.social__list}>
                                <SocialMediaSite blockData={socSit} />
                            </li>
                        ))}
                    </ul>

                    <p className={cS.copyright}>{blockData.Copyright}</p>
                </div>
                <div className={cS.footerColumn__menuWrap}>
                    <FooterMenu blockData={menuData} siteUrlMap={siteUrlMap} />
                </div>
            </div>
        </footer>
    )
}