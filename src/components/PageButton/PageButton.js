import React from 'react';

import { Link } from 'gatsby';

import cS from './PageButton.module.scss';

export default ({ blockData, siteUrlMap }) => {
    const getRealUrl = menuId => {
        const returnUrl = siteUrlMap.filter(el => el.id === `Pages_${menuId}`);
        const [finalUrl, restOfUrl] = [...returnUrl];

        if (finalUrl.url === '' || finalUrl.url === '/') {
            return '/';
        } else {
            return `/${finalUrl.url}`;
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