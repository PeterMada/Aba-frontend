import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';
import NewsList from '../NewsList/NewsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import cS from './SingleNews.module.scss';


export default ({ blockData, allNews = [] }) => {
    const createdDate = new Date(blockData.created_at);
    const formatedDate = `${createdDate.getDate()}. ${(createdDate.getMonth() + 1)}. ${createdDate.getFullYear()}`;
    const textContent = remark().use(recommended).use(remarkHtml).processSync(blockData.Text.replace(RegExp("\n", "g"), "<br>")).toString();

    const getName = (name) => {
        const titleBefore = name.TitleBefore ? name.TitleBefore : '';
        const titleAfter = name.TitleAfter ? name.TitleAfter : '';

        return `${titleBefore}${name.Name}${titleAfter}`;
    }

    return (
        <article className={cS.articleWrap}>
            <div className={cS.main}>
                <div className={cS.mainContent}>
                    <h1 className={cS.title}>{blockData.Title}</h1>

                    <div className={cS.perex}>
                        <p className={cS.perexInner}>{blockData.Perex}</p>
                    </div>

                    <Img className={cS.img} fluid={blockData.MainImage.childImageSharp.fluid} alt={blockData.Title} />

                    <div
                        className={cS.text}
                        dangerouslySetInnerHTML={{ __html: textContent }}>

                    </div>
                </div>

                <aside className={cS.list}>
                    {allNews.map((singleNews, index) => (
                        <NewsList blockData={singleNews.node} key={index} />
                    ))}
                </aside>

                <div className={cS.dateWrap}>

                    {blockData.news_tags.length > 0 &&
                        <div className={cS.tagsWrap}>
                            {blockData.news_tags.map((tag, index) => (
                                <Link to={`/clanky?tag=${encodeURI(tag.Title.toLowerCase())}`} key={index} className={cS.tag}><FontAwesomeIcon icon={faTag} size='1x' className='fa-flip-horizontal' aria-hidden='true' />{tag.Title}</Link>

                            ))}
                        </div>
                    }
                    {blockData.author !== null ? (
                        <Link to="" className={cS.name}>
                            {getName(blockData.author)}
                        </Link>) : ('')
                    }

                    <time dateTime={blockData.created_at} className={cS.date}>{formatedDate}</time>
                </div>
            </div>
        </article>
    )
}