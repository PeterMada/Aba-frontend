import React from 'react';

import BackgroundImage from 'gatsby-background-image';

import { Link } from 'gatsby';

import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';

import cS from './TextOnImage.module.scss';

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
    console.log(blockData);

    return (
        <div className={cS.wrap}>

            <BackgroundImage
                className={cS.img}
                fluid={blockData.BackgroundImg.childImageSharp.fluid}
                backgroundColor={`#040e18`}
                style={{ backgroundAttachment: `fixed` }}>
                <div className={cS.textOuter}>
                    <div className={cS.textWrap}>
                        <h2 className={cS.title}>{blockData.Title}</h2>
                        {blockData.Perex.length > 0 &&
                            <p className={cS.perex}>{blockData.Perex}</p>
                        }

                        <div
                            className={cS.text}
                            dangerouslySetInnerHTML={{ __html: remark().use(recommended).use(remarkHtml).processSync(blockData.Text).toString() }}>
                        </div>



                        {blockData.ButtonText?.length > 0 && blockData?.PageTarget && blockData?.ExternalUrl?.length === 0 &&
                            <Link to={getRealUrl(blockData.PageTarget)} className={cS.btn}>{blockData.ButtonText}</Link>
                        }

                        {blockData.ButtonText?.length > 0 && blockData.ExternalUrl && blockData?.PageTarget?.length === 0 &&
                            <a href={blockData.ExternalUrl} className={cS.btn}>{blockData.ButtonText}</a>
                        }
                    </div>
                </div>
            </BackgroundImage>
        </div >
    )
}
