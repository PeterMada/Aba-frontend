import React from 'react';

import { Link } from 'gatsby';

import cS from './PageButton.module.scss';

export default ({ blockData, siteUrlMap }) => {
    const getRealUrl = menuId => {
        const returnUrl = siteUrlMap.filter(el => el.id === `Pages_${menuId}`);
        const finalUrl = [...returnUrl];

        if (finalUrl[0].url === '' || finalUrl[0].url === '/') {
            return '/';
        } else {
            return `/${finalUrl[0].url}`;
        }
    }


    const getButton = () => {
        if (blockData?.ButtonText?.length > 0) {
            if (blockData?.PageTarget !== null) {
                return <Link to={getRealUrl(blockData.PageTarget)} className={`${cS.btn} nice-button`}>{blockData.ButtonText}</Link>;
            } else if (blockData?.ExternalUrl) {
                return <a href={blockData.ExternalUrl} className={`${cS.btn} nice-button`}>{blockData.ButtonText}</a>;
            }
        }
        return false;
    }

    const finallButton = getButton();

    if (finallButton) {
        return (
            <div>
                {finallButton}
            </div>
        );
    }

    return false;
}