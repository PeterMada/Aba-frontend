import React from 'react';

import { Link } from 'gatsby';

import cS from './FooterMenu.module.scss';


export default ({ blockData, siteUrlMap }) => {

    const getRealUrl = menuId => {
        const returnUrl = siteUrlMap.filter(el => el.id === `Pages_${menuId}`);
        const [finalUrl, restOfUrl] = [...returnUrl];

        if (finalUrl.url === '') {
            return '/';
        } else {
            return finalUrl.url;
        }
    }

    return (
        <>
            { blockData.FooterMenu.map((menuEl, index) => (

                < div key={`footer-menu${index}`} className={cS.wrap} >
                    <h5 className={cS.title} >{menuEl.Title}</h5>

                    <ul className={cS.menu}>
                        {menuEl.pages.map((menuLink, menuIndex) => (
                            <li
                                key={`menu-index-${index}-${menuIndex}`}
                                className={cS.menu__list}>
                                <Link
                                    to={getRealUrl(menuLink.id)}
                                    className={cS.menu__link} >
                                    {menuLink?.TitleInMenu !== null &&
                                        menuLink.TitleInMenu
                                    }

                                    {menuLink?.TitleInMenu === null &&
                                        menuLink.Title
                                    }
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div >
            ))}
        </>
    );
}