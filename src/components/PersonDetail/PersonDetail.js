import React, { useState } from 'react';

import Img from 'gatsby-image';
import ReactMarkdown from 'react-markdown';

import SocialMediaSite from './../SocialMediaSite/SocialMediaSite';

import cS from './PersonDetail.module.scss';

//const ReactMarkdown = require('react-markdown')

export default ({ blockData }) => {
    const [activeTab, setActiveTab] = useState(0);


    const changeTab = (e, index) => {
        e.preventDefault();
        setActiveTab(index);
    }

    return (
        <div className={cS.wrap}>
            <div className={cS.imgWrap}>
                <Img className={cS.img} fluid={blockData.TherapistImg.childImageSharp.fluid} alt={blockData.Name} />
                {blockData?.social_media_sites?.length > 0 &&
                    <div className={cS.social}>
                        {blockData.social_media_sites.map((social, index) => (
                            <SocialMediaSite className={cS.socialLink} blockData={social} key={index} />
                        ))}
                    </div>
                }
            </div>
            <div className={cS.textWrap}>
                <h1 className={cS.title}>{blockData.Name}</h1>
                <p className={cS.perex}>{blockData.Perex}</p>

                {blockData?.TabText?.length > 0 &&
                    <div className={cS.tabWrap}>
                        <div className={cS.tabControls}>

                            {blockData.TabText.map((tabEl, index) => (
                                <a className={activeTab === index ? `${cS.tabControl} ${cS.activeControl}` : `${cS.tabControl}`} href="" key={index} rel='nofollow' onClick={e => changeTab(e, index)}>{tabEl.Title}</a>
                            ))}
                        </div>
                        <div className={cS.tabContents}>

                            {blockData.TabText.map((tabEl, index) => (
                                <div key={index} className={activeTab === index ? `${cS.tabContent} ${cS.activeContent}` : `${cS.tabContent}`}>

                                    <ReactMarkdown source={tabEl.Text} />
                                </div>
                            ))}
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}