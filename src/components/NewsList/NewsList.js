import React from 'react';

import Img from 'gatsby-image';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';


import Time from './../Time/Time';



import cS from './NewsList.module.scss';

export default ({ blockData }) => {
    return (
        <article className={cS.item}>
            <Link to={`/novinky/${blockData.Url}`} className={cS.link} aria-label={blockData.Title} aria-hidden='true' tabIndex='-1'>
                <Img className={cS.img} fluid={blockData.MainImage.childImageSharp.fluid} alt={blockData.Title} />
            </Link>

            <div className={cS.newsTime}>
                <Time timeString={blockData.created_at} />
            </div>

            <Link to={`/novinky/${blockData.Url}`} className={cS.link}>
                <h1 className={cS.title}>{blockData.Title}</h1>
            </Link>
            {blockData.news_tags.length > 0 &&
                <div className={cS.tagsWrap}>
                    {blockData.news_tags.map((tag, index) => (
                        <Link to='novinky' key={index} className={cS.tag}><FontAwesomeIcon icon={faTag} size='1x' className='fa-flip-horizontal' aria-hidden='true' />{tag.Title}</Link>

                    ))}
                </div>
            }
            <p className={cS.text}>{blockData.Perex}</p>
        </article>
    )
}