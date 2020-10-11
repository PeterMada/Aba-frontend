import React from 'react';

import Img from 'gatsby-image';

import cS from './TextWithImage.module.scss';

export default ({ blockData }) => {

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
                            <p className={cS.textBlock__text}>{data.Text}</p>
                        </div>
                    </div>
                ))
            }
        </>

    );
}