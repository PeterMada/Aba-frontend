import React from 'react';
import Img from 'gatsby-image';

import cS from './SmallBanner.module.scss';

export default ({ blockData }) => {
    return (
        <>
            <Img fluid={blockData.childImageSharp.fluid} className={cS.wrap} />
        </>
    )
}