import React from 'react';

import BackgroundImage from 'gatsby-background-image';

import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';

import cS from './TextOnImage.module.scss';

export default ({ blockData }) => {

    return (
        <div className={cS.wrap}>

            <BackgroundImage
                className={cS.img}
                Tag="section"
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
                    </div>
                </div>
            </BackgroundImage>
        </div >
    )
}
