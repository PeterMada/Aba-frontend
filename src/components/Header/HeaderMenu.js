import React, { useState } from 'react';

import { Link } from 'gatsby';

import MenuButton from '../Menu/MenuButton';
import MenuItem from '../Menu/MenuItem';

import cS from './HeaderMenu.module.scss';



export default ({ blockData, siteUrlMap }) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(false);

    // TODO #4 Add arrow functionality to menu @PeterMada

    const menuButtonClick = (e) => {
        e.preventDefault();
        setActiveMenu(!activeMenu);

        if (!activeMenu) {
            document.body.classList.add('no-scroll');
            // TODO #3 Disable tab when mobile menu is open dosent work @PeterMada
            // setTabIndex(-1)
        } else {
            document.body.classList.remove('no-scroll');
            // setTabIndex(1);
        }
    }

    const openSubmenu = e => {
        e.preventDefault();
        const currentSubmenu = parseInt(e.currentTarget.dataset.id);

        if (activeSubmenu === currentSubmenu) {
            setActiveSubmenu(false);
        } else {
            setActiveSubmenu(currentSubmenu);
        }

    }

    const getRealUrl = menuId => {
        const returnUrl = siteUrlMap.filter(el => el.id === `Pages_${menuId}`);
        const [finalUrl, restOfUrl] = [...returnUrl];

        if (finalUrl.url === '') {
            return '/';
        } else {
            return finalUrl.url;
        }
    }

    const setTabIndex = (index = 1) => {
        const allElements = getKeyboardFocusableElements();
        allElements.map(el => {
            el.tabIndex = index;
        });
    }

    const getKeyboardFocusableElements = () => {
        const element = document.getElementsByTagName('main');

        return [...element[0].querySelectorAll('a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])')].filter(el => !el.hasAttribute('disabled'));
    }

    const openDesktopSubmenu = (e) => {
        const currentSubmenu = parseInt(e.currentTarget.dataset.id);

        if (activeSubmenu !== currentSubmenu) {
            setActiveSubmenu(currentSubmenu);
        }
    }

    const closeDesktopSubmenu = (e) => {
        setActiveSubmenu(false);
    }


    return (
        <div>
            <a href="" className={activeMenu ? `${cS.menuButton} ${cS.active}` : `${cS.menuButton}`} aria-label='Open menu' onClick={menuButtonClick} rel="nofollow">
                <div className={cS.menuBar1}></div>
                <div className={cS.menuBar2}></div>
                <div className={cS.menuBar3}></div>
            </a>
            <nav className={activeMenu ? `${cS.menu} ${cS.active}` : `${cS.menu}`} aria-label="Main Navigation">
                <ul className={cS.list}>
                    {blockData.Menu.map((element, index) => (
                        <li key={`menu-top--${index}`} className={cS.item} onMouseOver={openDesktopSubmenu} onMouseLeave={closeDesktopSubmenu} data-id={index}>
                            <Link to={getRealUrl(element.MainPage.id)} className={cS.link} aria-current="page">
                                {element.MainPage?.TitleInMenu !== null &&
                                    element.MainPage.TitleInMenu
                                }

                                {element.MainPage?.TitleInMenu === null &&
                                    element.MainPage.Title
                                }

                            </Link>

                            {element.SubmenuPages.length > 0 &&
                                <button
                                    aria-expanded='false'
                                    className={activeSubmenu === index ? `${cS.plusWrap} ${cS.opened}` : `${cS.plusWrap} ${cS.closed}`}
                                    onClick={openSubmenu}
                                    data-id={index} >
                                    <span className={`${cS.horizontal} ${cS.row}`}></span>
                                    <span className={`${cS.vertical} ${cS.row}`}></span>

                                    <div className={cS.arrowRightNew}>
                                        <div className={cS.arrowMaskNew}></div>
                                    </div>
                                    <span className='visuallyhidden'>Open submenu for "{element.MainPage.Title}"</span>
                                </button>
                            }

                            {element.SubmenuPages.length > 0 &&
                                <ul aria-haspopup="true" aria-expanded="false" className={activeSubmenu === index ? `${cS.listInner} ${cS.list} ${cS.activeSubmenu}` : `${cS.listInner} ${cS.list}`}>
                                    {element.SubmenuPages.map((subMenu, indexInner) => (
                                        <li key={`submenu--${indexInner}`} className={`${cS.item} ${cS.itemInner}`}>
                                            <Link to={`/${getRealUrl(subMenu.id)}`} className={cS.link} tabIndex={activeSubmenu === index ? `0` : `-1`}>

                                                {subMenu?.TitleInMenu?.length > 0 &&
                                                    subMenu.TitleInMenu
                                                }

                                                {!subMenu?.TitleInMenu?.length &&
                                                    subMenu.Title
                                                }

                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            }
                        </li>
                    ))}
                </ul>
            </nav>
        </div >
    )
}
