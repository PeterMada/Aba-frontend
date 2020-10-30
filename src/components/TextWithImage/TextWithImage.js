import React from 'react';

import Img from 'gatsby-image';

import { Link } from 'gatsby';

import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';

import cS from './TextWithImage.module.scss';

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

    return (
        <>
            {
                blockData.map((data, index) => (
                    <div key={`textWithImage--${index}`} className={(index % 2 === 0) ? `${cS.wrap} ${cS.wrapOdd}` : `${cS.wrap}`}>
                        <div className={cS.imageBlock}>
                            <Img className={cS.image} fluid={data.Img.childImageSharp.fluid} />
                        </div>
                        <div className={cS.textBlock} >
                            <h2 className={cS.textBlock__title}>{data.Title}</h2>
                            {data?.Perex?.length > 0 &&
                                <p className={cS.textBlock__perex}>{data.Perex}</p>
                            }

                            <div
                                className={cS.textBlock__text}
                                dangerouslySetInnerHTML={{ __html: remark().use(recommended).use(remarkHtml).processSync(data.Text).toString() }}>
                            </div>

                            {data.ButtonText?.length > 0 && data?.PageTarget && data?.ExternalUrl?.length === 0 &&
                                <Link to={getRealUrl(data.PageTarget)} className={cS.btn}>{data.ButtonText}</Link>
                            }

                            {data.ButtonText?.length > 0 && data.ExternalUrl && data?.PageTarget?.length === 0 &&
                                <a href={data.ExternalUrl} className={cS.btn}>{data.ButtonText}</a>
                            }
                        </div>
                    </div>
                ))
            }
        </>

    );
}