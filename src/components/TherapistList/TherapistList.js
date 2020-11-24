import React from 'react';

import { Link } from 'gatsby';
import Img from 'gatsby-image';

import cS from './TherapistList.module.scss';

/*
export const TherapistList = ({ blockData }) => {

    return (
        <article className={cS.item}>
            <Link to={`/terapeuti/${blockData.Url}`} className={cS.link}>
                <Img className={cS.img} fluid={blockData.TherapistImg.childImageSharp.fluid} alt={blockData.Name} />
                <h1 className={cS.title}>{blockData.Name}</h1>
                <p className={cS.text}>{blockData.Perex}</p>
            </Link>
        </article>
    )
}
*/

export const TherapistList = () => {
    return <article />;
}