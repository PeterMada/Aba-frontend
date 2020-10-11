import React from 'react';

import Img from 'gatsby-image';

import cS from './TextWithPhotoEffect.module.scss';

export default ({ blockData }) => {
    return (
        <div className={cS.item}>
            <div className={cS.imgWrap}>
                <Img fluid={blockData.Photo.childImageSharp.fluid} alt={blockData.Title} className={cS.img} />
            </div>
            <h3 className={cS.title}>{blockData.Title}</h3>
            <p className={cS.text}>{blockData.Text}</p>
        </div>
    )
}