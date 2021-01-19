import React from 'react';

import BackgroundImage from 'gatsby-background-image';

import remark from 'remark';
import remarkHtml from 'remark-html';

import PageButton from './../PageButton/PageButton';

import cS from './TextOnImage.module.scss';

export default ({ blockData, siteUrlMap }) => {

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
                            dangerouslySetInnerHTML={{ __html: remark().use(remarkHtml).processSync(blockData.Text) }}>
                        </div>

                        <PageButton blockData={blockData} siteUrlMap={siteUrlMap} />
                    </div>
                </div>
            </BackgroundImage>
        </div >
    )
}
