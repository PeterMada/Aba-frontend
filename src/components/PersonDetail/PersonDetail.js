import React, { useState } from 'react';

import Img from 'gatsby-image';

import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';

import Form from './../Form/Form';

import SocialMediaSite from './../SocialMediaSite/SocialMediaSite';

import cS from './PersonDetail.module.scss';

//const ReactMarkdown = require('react-markdown')

export default ({ blockData }) => {
    const [activeTab, setActiveTab] = useState(0);


    const changeTab = (e, index) => {
        e.preventDefault();
        setActiveTab(index);
    }

    const titleBefore = blockData?.TitleBefore?.length > 0 ? `${blockData.TitleBefore}` : '';
    const titleAfter = blockData?.TitleAfter?.length > 0 ? `${blockData?.TitleAfter}` : '';

    const personFullName = `${titleBefore}${blockData.Name}${titleAfter}`;

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
                <h1 className={cS.title}>{personFullName}</h1>
                <p className={cS.perex}>{blockData.Perex}</p>

                {blockData?.TabText?.length > 0 &&
                    <div className={cS.tabWrap}>
                        <div className={cS.tabControls}>
                            {blockData.TabText.map((tabEl, index) => (
                                <a className={activeTab === index ? `${cS.tabControl} ${cS.activeControl}` : `${cS.tabControl}`} href="" key={index} rel='nofollow' onClick={e => changeTab(e, index)}>{tabEl.Title}</a>
                            ))}

                            <a className={activeTab === 9999 ? `${cS.tabControl} ${cS.activeControl}` : `${cS.tabControl}`} href="" key='9999' rel='nofollow' onClick={e => changeTab(e, 9999)}>Kontakt</a>

                        </div>
                        <div className={cS.tabContents}>

                            {blockData.TabText.map((tabEl, index) => (
                                <div
                                    key={index}
                                    className={activeTab === index ? `${cS.tabContent} ${cS.activeContent}` : `${cS.tabContent}`}
                                    dangerouslySetInnerHTML={{ __html: remark().use(recommended).use(remarkHtml).processSync(tabEl.Text.replace(RegExp("\n", "g"), "<br>")).toString() }}>
                                </div>
                            ))}
                            <div
                                key='9999'
                                className={activeTab === 9999 ? `${cS.tabContent} ${cS.activeContent}` : `${cS.tabContent}`}>
                                {blockData.Email.length > 0 &&
                                    <div className={cS.contactEmail}>
                                        <a href={`mailto:${blockData.Email}`}>{blockData.Email}</a>
                                    </div>
                                }
                                <Form />
                            </div>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}