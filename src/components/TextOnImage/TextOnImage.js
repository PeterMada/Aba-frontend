import React from 'react';

import BackgroundImage from 'gatsby-background-image';

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
                        <p className={cS.text}>{blockData.Text}</p>
                    </div>
                </div>
            </BackgroundImage>
        </div >
    )
}
