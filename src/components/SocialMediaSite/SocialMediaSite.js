import React from 'react';

import Img from 'gatsby-image';

export default ({ blockData }) => {
    return (
        <>
            <a
                href={blockData.Url}
                aria-label={blockData.Title}
                title={blockData.Nazev}
                target='_blank'
                rel='noopener noreferrer'
            //className={ blockData.SocialniSit }
            >
                <Img
                    fixed={blockData.Logo.childImageSharp.fixed} />
            </a>
        </>
    )
}