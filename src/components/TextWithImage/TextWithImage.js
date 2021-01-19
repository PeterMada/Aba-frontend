import React from 'react';
import Img from 'gatsby-image';

import remark from 'remark';
import remarkHtml from 'remark-html';

import PageButton from './../PageButton/PageButton';

import cS from './TextWithImage.module.scss';

export default ({ blockData, siteUrlMap }) => {

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
                                dangerouslySetInnerHTML={{ __html: remark().use(remarkHtml).processSync(data.Text) }}>
                            </div>

                            <PageButton blockData={data} siteUrlMap={siteUrlMap} />
                        </div>
                    </div>
                ))
            }
        </>

    );
}