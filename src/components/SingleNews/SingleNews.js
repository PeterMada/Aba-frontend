import React from 'react';
import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';

import cS from './SingleNews.module.scss';



export default ({ blockData }) => {
    const createdDate = new Date(blockData.created_at);
    const formatedDate = `${createdDate.getDate()}. ${(createdDate.getMonth() + 1)}. ${createdDate.getFullYear()}`;

    const hasGallery = blockData.ImgGallery.length > 0 ? true : false;


    const textContent = remark().use(recommended).use(remarkHtml).processSync(blockData.Text.replace(RegExp("\n", "g"), "<br>")).toString();

    return (
        <article className={hasGallery ? `${cS.articleWrap} ${cS.withGallery}` : `${cS.articleWrap} ${cS.noGallery}`}>
            <div className={cS.main}>
                <h1 className={cS.title}>{blockData.Title}</h1>
                <div className={blockData.Perex.length > 0 ? `${cS.perex}` : `${cS.perex} ${cS.hidden}`}>
                    <p className={cS.perexInner}>{blockData.Perex}</p>
                </div>

                <div
                    className={cS.text}
                    dangerouslySetInnerHTML={{ __html: textContent }}>

                </div>
                <time dateTime={blockData.created_at} className={cS.date}>{formatedDate}</time>
            </div>
        </article>
    )
}