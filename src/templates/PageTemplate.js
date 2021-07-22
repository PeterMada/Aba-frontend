import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';


import { Helmet } from "react-helmet"

import RootLayout from '../components/RootLayout/RootLayout';
import Slider from '../components/Slider/Slider';
import TextWithImage from '../components/TextWithImage/TextWithImage';
import TextBlock from '../components/TextBlock/TextBlock';
import Footer from '../components/Footer/Footer';
import { TherapistList } from '../components/TherapistList/TherapistList';
import MaxWidthWrap from '../components/MaxWidthWrap/MaxWidthWrap';
import NewsList from '../components/NewsList/NewsList';
import TextOnImage from '../components/TextOnImage/TextOnImage';
import NiceTitle from '../components/NiceTitle/NiceTitle';
import TextOnSlilder from '../components/TextOnSlider/TextOnSlider';
import TextWithPhotoEffect from '../components/TextWithPhotoEffect/TextWithPhotoEffect';
import SmallBanner from '../components/SmallBanner/SmallBanner';
import Form from '../components/Form/Form';

import cSTherapist from './TherapistSignpostTemplate.module.scss';
import cSNews from './NewsSignpostTemplate.module.scss';
import cS from './PageTemplate.module.scss';


import { getUser, isLoggedIn } from '../services/auth';
import { number } from 'prop-types';

export default ({ data, pageContext }) => {

    let params;

    const getTags = () => {
        let tag = ''

        if (typeof window !== 'undefined') {
            // params = new URLSearchParams(document.location.search.substring(1));
            // tag = params.get('tag');
        };

        console.log('xab')
        console.log(tag);
        return tag
    }

    //TODO #9 @PeterMada

    const [tags, setTags] = useState(getTags());


    // TODO #3 @PeterMada

    const keywords = data.strapiPages.MetaKeywords ? data.strapiPages.MetaKeywords : '';
    const description = data.strapiPages.MetaDescription ? data.strapiPages.MetaDescription : '';


    const getListOfArticles = (listFromStrapi, signpostUrl) => {
        let allNews = [];
        let returnComponent = null;

        allNews = listFromStrapi.edges.filter(el => {
            let returnValue = true;

            if (el.node.Url === 'test') {
                return false;
            }

            /*
            if (tag) {
                returnValue = false;
                const currentTag = el.node.tags.find(news => {
                    return tag === decodeURI(news.Title.toLowerCase())
                });
                if (currentTag) {
                    returnValue = true;
                }
            }
            */

            return returnValue;
        });

        returnComponent = (
            <MaxWidthWrap>
                <div className={`${cSNews.list} ${cSNews.listShort}`}>
                    {allNews.map((singleNews, index) => {
                        if (singleNews.node.Url !== 'test') {
                            return <NewsList blockData={singleNews.node} key={index} articleUrl={signpostUrl} therapistUrl={pageContext.therapistUrl} />
                        }
                    })}
                </div>
            </MaxWidthWrap>
        );

        return returnComponent;
    }

    const getListOfTherapist = () => {
        let allTherapist = [];
        let returnComponent = null;


        allTherapist = data.allStrapiTherapists.edges.sort(() => Math.random() - Math.random());

        returnComponent = (
            <MaxWidthWrap>
                <div className={cSTherapist.wrap}>
                    {allTherapist.map((therapist, index) => (
                        <TherapistList blockData={therapist.node} key={index} therapistUrl={pageContext.therapistUrl} />
                    ))}
                </div>
            </MaxWidthWrap>
        );

        return returnComponent;
    }

    const getRightComponent = currentComponent => {
        let returnComponent = '';

        // Slider Component
        if (currentComponent?.sliders?.length > 0) {
            returnComponent = <Slider blockData={currentComponent.sliders} siteUrlMap={pageContext.pagesUrlMap} />
        }

        // Text block component
        if (currentComponent?.text_blocks?.length > 0) {
            returnComponent = <TextBlock blockData={currentComponent.text_blocks} siteUrlMap={pageContext.pagesUrlMap} />
        }

        // Text block with images component
        if (currentComponent?.text_block_with_images?.length > 0) {
            returnComponent = <TextWithImage blockData={currentComponent.text_block_with_images} siteUrlMap={pageContext.pagesUrlMap} />
        }

        // Text on image component
        if (currentComponent?.text_on_images?.length > 0) {
            currentComponent.text_on_images.map((textOnImage, index) => (
                returnComponent = <TextOnImage blockData={textOnImage} siteUrlMap={pageContext.pagesUrlMap} />
            ));
        }

        // Text on sliders component
        if (currentComponent?.text_on_sliders?.length > 0) {
            returnComponent = <TextOnSlilder blockData={currentComponent.text_on_sliders} backgroundData={currentComponent.BackgroundImg} />
        }

        // Nice Title component
        if (currentComponent?.NiceGraphicTitle?.length > 0 && currentComponent?.NiceTitle?.length) {
            returnComponent = <NiceTitle title={currentComponent?.NiceTitle} subtitle={currentComponent?.NiceGraphicTitle} text={currentComponent?.NiceTextUnderTitle?.length ? currentComponent.NiceTextUnderTitle : ''} />
        }

        // Articles list component
        if (currentComponent?.HasListOfArticles) {
            let allNews = [];
            const hasButtonText = currentComponent?.ButtonText?.length > 0 ? true : false;

            allNews = data.allStrapiNews.edges.filter(el => {
                let returnValue = true;
                /*
                if (tag) {
                    returnValue = false;
                    const currentTag = el.node.tags.find(news => {
                        return tag === decodeURI(news.Title.toLowerCase())
                    });
                    if (currentTag) {
                        returnValue = true;
                    }
                }
                */
                return returnValue;
            });

            if (!pageContext.isArticleSignpostPage) {
                let numberOfNews = 0;
                allNews = data.allStrapiNews.edges.filter((el, index) => {

                    if (el.node.Url !== 'test') {
                        numberOfNews++;

                        if (numberOfNews < 5) {
                            return true;
                        }
                        return false;
                    }

                    return false;
                });

            }



            let hasEnoughtNews = allNews.length >= 4 ? true : false;

            returnComponent = (
                <MaxWidthWrap>
                    <NiceTitle title={currentComponent?.Title} subtitle={currentComponent?.GraphicTitle} text={currentComponent?.TextUnderTitle?.length ? currentComponent.TextUnderTitle : ''} />

                    <div className={`${cSNews.list} ${cSNews.listShort}`}>
                        {allNews.map((singleNews, index) => {
                            if (singleNews.node.Url !== 'test') {
                                return <NewsList blockData={singleNews.node} key={index} articleUrl={pageContext.articlesUrl} therapistUrl={pageContext.therapistUrl} />
                            }
                        })}
                    </div>


                    {(hasButtonText && hasEnoughtNews) ? (
                        <div className={cSTherapist.buttonWrap}>
                            <Link to={`/${pageContext.articlesUrl}`} className={cSTherapist.button}>{currentComponent.ButtonText}</Link>
                        </div>
                    ) : null
                    }
                </MaxWidthWrap>
            )
        }


        // Workshops list component
        if (currentComponent?.HasListOfWorkshops) {
            let allWorkshops = [];
            const hasButtonText = currentComponent?.ButtonText?.length > 0 ? true : false;

            allWorkshops = data.allStrapiWorkshops.edges.filter(el => {
                let returnValue = true;

                /*
                if (tag) {
                    returnValue = false;
                    const currentTag = el.node.tags.find(news => {
                        return tag === decodeURI(news.Title.toLowerCase())
                    });
                    if (currentTag) {
                        returnValue = true;
                    }
                }
                */
                return returnValue;
            });

            // allWorkshops = data.allStrapiWorkshops.edges.filter((el, index) => index < 4);

            let hasEnoughWorkshops = allWorkshops.length >= 4 ? true : false;


            returnComponent = (
                <MaxWidthWrap>
                    <NiceTitle title={currentComponent?.Title} subtitle={currentComponent?.GraphicTitle} text={currentComponent?.TextUnderTitle?.length ? currentComponent.TextUnderTitle : ''} />

                    <div className={`${cSNews.list} ${cSNews.listShort}`}>
                        {allWorkshops.map((singleNews, index) => {
                            if (singleNews.node.Url !== 'test') {
                                return <NewsList blockData={singleNews.node} key={index} articleUrl={pageContext.workshopsUrl} therapistUrl={pageContext.therapistUrl} />
                            }
                        })}
                    </div>


                    {(hasButtonText && hasEnoughWorkshops) ? (
                        <div className={cSTherapist.buttonWrap}>
                            <Link to={`/${pageContext.workshopsUrl}`} className={cSTherapist.button}>{currentComponent.ButtonText}</Link>
                        </div>
                    ) : null
                    }
                </MaxWidthWrap>
            )
        }


        // Therapist list component
        if (currentComponent?.HasListOfTherapist) {
            let allTherapist = [];
            const hasButtonText = currentComponent?.ButtonText?.length > 0 ? true : false;

            // allTherapist = data.allStrapiTherapists.edges.filter(el => true);

            allTherapist = data.allStrapiTherapists.edges.sort(() => Math.random() - Math.random()).slice(0, 4);


            const hasEnoughtTherapist = allTherapist.length > 4 ? true : false;

            returnComponent = (
                <MaxWidthWrap>
                    <NiceTitle title={currentComponent?.Title} subtitle={currentComponent?.GraphicTitle} text={currentComponent?.TextUnderTitle?.length ? currentComponent.TextUnderTitle : ''} />

                    <div className={cSTherapist.wrap}>
                        {allTherapist.map((therapist, index) => (
                            <TherapistList blockData={therapist.node} key={index} therapistUrl={pageContext.therapistUrl} />
                        ))}
                    </div>


                    {hasButtonText && hasEnoughtTherapist &&
                        <div className={cSTherapist.buttonWrap}>
                            <Link to={`/${pageContext.therapistUrl}`} className={cSTherapist.button}>{currentComponent.ButtonText}</Link>
                        </div>
                    }

                </MaxWidthWrap>
            )
        }

        // Text with photo effect component
        if (currentComponent?.text_with_photo_effects?.length > 0) {
            const allBlocks = currentComponent.text_with_photo_effects.filter((el, index) => index < 4);

            returnComponent = (
                <MaxWidthWrap>
                    {currentComponent?.Title?.length > 0 &&
                        <NiceTitle title={currentComponent?.Title} subtitle={currentComponent?.GraphicTitle} text={currentComponent?.TextUnderTitle?.length ? currentComponent.TextUnderTitle : ''} />
                    }

                    <div className={cS.textWithPhotoEffectWrap}>
                        {allBlocks.map((el, index) => (
                            <TextWithPhotoEffect blockData={el} key={index} />
                        ))}
                    </div>

                </MaxWidthWrap>
            )
        }

        // Small img banner 
        if (currentComponent?.SmallImgBackgroundImg !== null) {
            returnComponent = (
                <SmallBanner blockData={currentComponent.SmallImgBackgroundImg} />
            )
        }

        return returnComponent;
    }

    const siteTitle = data.strapiPages.Title;
    const siteTitleMenu = data.strapiPages.TitleInMenu;

    let currentPageTitle = '';
    if (siteTitle?.toLowerCase() === 'homepage') {
        currentPageTitle = data.strapiSettings.SiteName;
    } else {
        if (siteTitleMenu) {
            currentPageTitle = `${siteTitleMenu} - ${data.strapiSettings.SiteName}`;
        } else {
            currentPageTitle = `${siteTitle} - ${data.strapiSettings.SiteName}`;
        }
    }

    let isContactPage = false;
    if (data.strapiPages.Title.toLowerCase() === 'kontakt') {
        isContactPage = true;
    }

    let getPageContent = () => {
        let returnComponent = '';

        returnComponent = (
            data.strapiPages.DynamicComponent.map((component, index) => (
                <div key={index}>
                    {getRightComponent(component)}
                </div>
            ))
        );


        return returnComponent;
    }

    const getOtherLists = () => {
        let returnComponent = null;

        if (pageContext.isArticleSignpostPage) {
            returnComponent = getListOfArticles(data.allStrapiNews, pageContext.articlesUrl);
        }

        if (pageContext.isWorkshopsSignpostPage) {
            returnComponent = getListOfArticles(data.allStrapiWorkshops, pageContext.workshopsUrl);
        }

        if (pageContext.isTherapistSignpostPage) {
            returnComponent = getListOfTherapist();
        }

        return returnComponent;
    }

    return (
        <>

            {isLoggedIn() ? (
                <>
                    <RootLayout siteData={data.strapiSettings} siteUrlMap={pageContext.pagesUrlMap} siteMenu={data.strapiMenuHeader}>

                        <Helmet>
                            <title>{currentPageTitle}</title>
                            <meta name="description" content={keywords} />
                            <meta name="keywords" content={description} />
                        </Helmet>
                        <main className={cS.main}>
                            {isContactPage ? (
                                <MaxWidthWrap>
                                    <div className={cS.formWrap}>
                                        <Form />
                                    </div>
                                </MaxWidthWrap>
                            ) : getPageContent()}
                            {getOtherLists()}
                        </main>

                        <Footer blockData={data.strapiSettings} menuData={data.strapiMenuFooter} siteUrlMap={pageContext.pagesUrlMap} socialSites={data.strapiSettings.social_media_sites} />
                    </RootLayout>
                </>

            ) : (
                <div style={{ margin: `0 auto`, textAlign: 'center', padding: `5rem 1rem` }}>
                    Pro zobrazení stránky se musíte <Link to="/app/login">přihlásit</Link>.
                </div>
            )}

        </>
    );

}


export const query = graphql`
    query($pageId: String!) {
        strapiSettings {
            SiteName
            Copyright
            SiteLogo {
                publicURL
                childImageSharp {
                    fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
            social_media_sites {
                Title
                Url
                Logo {
                    childImageSharp {
                        fixed(width: 30){
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        }
        strapiMenuHeader {
            Menu {
              MainPage {
                Url
                Title
                TitleInMenu
                id
              }
              SubmenuPages {
                Url
                Title
                TitleInMenu
                id
              }
            }
        }

        strapiMenuFooter {
            id
            FooterMenu {
                Title
                id
                pages {
                    id
                    Url
                    parent
                    Title
                    TitleInMenu
                }
                external_links {
                    id
                    Url
                    Title
                }
            }
        }
        strapiPages(id: {eq: $pageId}) {
            Title
            TitleInMenu
            Url
            MetaKeywords
            MetaDescription
            DynamicComponent {
                GraphicTitle
                TextUnderTitle
                Title
                NiceGraphicTitle
                NiceTextUnderTitle
                NiceTitle
                HasListOfArticles
                HasListOfTherapist
                HasListOfWorkshops
                id
                SmallImgTitle
                ButtonText
                BackgroundImg {
                    childImageSharp {
                        fluid(maxWidth: 2500) {
                        ...GatsbyImageSharpFluid_noBase64
                        }
                    }
                }
                SmallImgBackgroundImg {
                    childImageSharp {
                        fluid(maxWidth: 2500) {
                        ...GatsbyImageSharpFluid_noBase64
                        }
                    }
                }
                sliders {
                    id
                    Title
                    Text
                    ControlsColor
                    ButtonText
                    PageTarget
                    ExternalUrl
                    SliderImg {
                        childImageSharp {
                            fluid(maxWidth: 2500) {
                            ...GatsbyImageSharpFluid_noBase64
                            }
                        }
                    }
                }
                text_blocks {
                    Title
                    Perex
                    Text
                    ButtonText
                    PageTarget
                    ExternalUrl
                    BackgroundColor
                }
                text_block_with_images {
                    Title
                    Perex
                    Text
                    ButtonText
                    PageTarget
                    ExternalUrl
                    Img {
                        childImageSharp {
                            fluid(maxWidth: 1000) {
                            ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }    
                text_on_images {
                    Title
                    Perex
                    Text
                    ButtonText
                    PageTarget
                    ExternalUrl
                    BackgroundImg {
                        childImageSharp {
                            fluid(maxWidth: 2500) {
                            ...GatsbyImageSharpFluid_noBase64
                            }
                        }
                    }
                }
                
                text_on_sliders {
                    ShowTitle
                    Text
                    TextUnder
                    Title
                }
                text_with_photo_effects {      
                    Title
                    Text
                    Photo {
                        childImageSharp {
                            fluid(maxWidth: 500) {
                            ...GatsbyImageSharpFluid_noBase64
                            }
                        }
                    }
                }
            }
        }
        allStrapiTherapists(filter: {Url: {ne: "test"}}) {
            edges {
              node {
                    id
                    Url
                    Name
                    Perex
                    MetaKeywords
                    MetaDescription
                    TabText {
                        Text
                        Title
                    }
                    TherapistImg {
                        childImageSharp {
                            fluid(maxWidth: 250) {
                            ...GatsbyImageSharpFluid
                            }
                        }
                    }
              }
            }
        }
        allStrapiNews(filter: {Url: {ne: "test"}}) {
            edges {
                node {
                    Perex
                    Title
                    Url
                    MetaKeywords
                    MetaDescription
                    created_at
                    tags {
                        Title
                        id
                    }
                    author{
                        id
                        TitleBefore
                        TitleAfter
                        Name
                        Url
                    }
                    MainImage {
                        childImageSharp {
                            fluid(maxWidth: 250) {
                            ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
        allStrapiWorkshops(filter: {Url: {ne: "test"}}) {
            edges {
                node {
                    Perex
                    Title
                    Url
                    MetaKeywords
                    MetaDescription
                    created_at
                    tags {
                        Title
                        id
                    }
                    author{
                        id
                        TitleBefore
                        TitleAfter
                        Name
                        Url
                    }
                    MainImage {
                        childImageSharp {
                            fluid(maxWidth: 250) {
                            ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
    }`;