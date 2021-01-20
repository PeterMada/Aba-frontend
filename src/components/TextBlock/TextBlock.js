import React from 'react';

import remark from 'remark';
import remarkHtml from 'remark-html';

import PageButton from './../PageButton/PageButton';

import cS from './TextBlock.module.scss';

export default ({ blockData, siteUrlMap }) => {

    return (
        <div className={cS.wrap}>
            {
                blockData.map((block, index) => (
                    <div style={{
                        backgroundColor: `${block.BackgroundColor}`
                    }}
                        key={`text-block--${index}`} >
                        <article className={cS.item} >
                            <h1 className={cS.title}>{block.Title}</h1>
                            {block?.Perex?.length > 0 &&
                                <p className={cS.perex}>{block.Perex}</p>
                            }

                            <div
                                className={cS.text}
                                dangerouslySetInnerHTML={{ __html: remark().use(remarkHtml).processSync(block.Text) }}>
                            </div>

                            <PageButton blockData={block} siteUrlMap={siteUrlMap} />

                        </article>
                    </div>
                ))
            }
        </div>
    )
}