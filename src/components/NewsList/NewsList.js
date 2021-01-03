import React from 'react';

import Img from 'gatsby-image';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';


import { Time } from './../Time/Time';



import cS from './NewsList.module.scss';


export default ({ blockData }) => {
    // TODO #4 @PeterMada
    //const params = new URLSearchParams(document.location.search.substring(1));
    //const currentTag = params.get('tag');
    const currentTag = '';

    const getName = (name) => {
        const titleBefore = name.TitleBefore ? name.TitleBefore : '';
        const titleAfter = name.TitleAfter ? name.TitleAfter : '';

        return `${titleBefore}${name.Name}${titleAfter}`;
    }
    return (
        <article className={cS.item}>
            <div className={cS.itemWrap}>
                <Link to={`/clanky/${blockData.Url}`} className={cS.link} aria-label={blockData.Title} aria-hidden='true' tabIndex='-1'>
                    <Img className={cS.img} fluid={blockData.MainImage.childImageSharp.fluid} alt={blockData.Title} />
                </Link>


                <div className={cS.innerWrap}>
                    <Link to={`/clanky/${blockData.Url}`} className={cS.link}>
                        <h1 className={cS.title}>{blockData.Title}</h1>
                    </Link>

                    <p className={cS.text}>{blockData.Perex}</p>

                    <div className={cS.bottomWrap}>

                        {blockData.news_tags.length > 0 &&
                            <div className={cS.tagsWrap}>
                                {blockData.news_tags.map((tag, index) => (
                                    <Link to={`/clanky?tag=${encodeURI(tag.Title.toLowerCase())}`} key={index} className={currentTag === tag.Title.toLowerCase() ? `${cS.tag} ${cS.tagActive}` : `${cS.tag}`}>
                                        <FontAwesomeIcon icon={faTag} size='1x' className='fa-flip-horizontal' aria-hidden='true' />
                                        {tag.Title}
                                    </Link>
                                ))}
                            </div>
                        }


                        <div className={cS.footerWrap}>
                            <div className={cS.newsTime}>
                                <Time timeString={blockData.created_at} />
                            </div>

                            {blockData.author !== null ? (
                                <Link to={`/terapeuti/${blockData.author.Url}`} className={cS.name}>
                                    {getName(blockData.author)}
                                </Link>) : ('')}
                        </div>
                    </div>

                </div>
            </div>
        </article>
    )
}