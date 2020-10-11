import React from 'react';


import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';

import cS from './TextBlock.module.scss';

export default ({ blockData }) => {
    return (
        <div className={cS.wrap}>
            {
                blockData.map((block, index) => (
                    <article className={cS.item} key={`text-block--${index}`}>
                        <h1 className={cS.title}>{block.Title}</h1>
                        {block.Perex.length > 0 &&
                            <p className={cS.perex}>{block.Perex}</p>
                        }

                        <div
                            className={cS.text}
                            dangerouslySetInnerHTML={{ __html: remark().use(recommended).use(remarkHtml).processSync(block.Text).toString() }}>

                        </div>

                    </article>
                ))
            }
        </div>
    )
}