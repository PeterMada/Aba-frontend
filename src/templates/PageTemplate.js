import React from 'react';
import { graphql, Link } from 'gatsby';


import { Helmet } from "react-helmet"

import RootLayout from '../components/RootLayout/RootLayout';
import Slider from '../components/Slider/Slider';
import TextWithImage from '../components/TextWithImage/TextWithImage';
import TextBlock from '../components/TextBlock/TextBlock';
import Footer from '../components/Footer/Footer';
import TherapistList from '../components/Therapist/TherapistList';
import MaxWidthWrap from '../components/MaxWidthWrap/MaxWidthWrap';
import NewsList from '../components/NewsList/NewsList';
import TextOnImage from '../components/TextOnImage/TextOnImage';
import NiceTitle from '../components/NiceTitle/NiceTitle';
import TextOnSlilder from '../components/TextOnSlider/TextOnSlider';
import TextWithPhotoEffect from '../components/TextWithPhotoEffect/TextWithPhotoEffect';
import SmallBanner from '../components/SmallBanner/SmallBanner'

import cSTherapist from './TherapistSignpostTemplate.module.scss';
import cSNews from './NewsSignpostTemplate.module.scss';
import cS from './PageTemplate.module.scss';

export default ({ data, pageContext }) => {

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
        if (currentComponent?.NiceTitle?.length > 0) {
            returnComponent = <NiceTitle title={currentComponent?.Title} subtitle={currentComponent?.GraphicTitle} text={currentComponent?.TextUnderTitle?.length ? currentComponent.TextUnderTitle : ''} />

        }

        // News list component
        if (currentComponent?.HasNewsList) {
            let allNews = [];
            const isLongList = currentComponent?.IsLongList ? true : false;
            const hasButtonText = currentComponent?.ButtonText?.length > 0 ? true : false;

            if (isLongList) {
                allNews = data.allStrapiNews.edges.filter((el, index) => true);
            } else {
                allNews = data.allStrapiNews.edges.filter((el, index) => index < 4);
            }


            const hasEnoughtNews = allNews.length >= 4 ? true : false;

            returnComponent = (
                <MaxWidthWrap>
                    <NiceTitle title={currentComponent?.Title} subtitle={currentComponent?.GraphicTitle} text={currentComponent?.TextUnderTitle?.length ? currentComponent.TextUnderTitle : ''} />

                    <div className={cSNews.list}>
                        {allNews.map((singleNews, index) => (
                            <NewsList blockData={singleNews.node} key={index} />
                        ))}
                    </div>


                    {(!isLongList && hasButtonText && hasEnoughtNews) ? (
                        <div className={cSTherapist.buttonWrap}>
                            <Link to='/novinky' className={cSTherapist.button}>{currentComponent.ButtonText}</Link>
                        </div>
                    ) : null
                    }
                </MaxWidthWrap>
            )
        }


        // Therapist list component
        if (currentComponent?.HasTherapistList) {
            let allTherapist = [];
            const isLongList = currentComponent?.IsLongList ? true : false;
            const hasButtonText = currentComponent?.ButtonText?.length > 0 ? true : false;

            if (isLongList) {
                allTherapist = data.allStrapiTherapists.edges.filter(el => true);
            } else {
                allTherapist = data.allStrapiTherapists.edges.sort(() => Math.random() - Math.random()).slice(0, 4);
            }

            const hasEnoughtTherapist = allTherapist.length > 4 ? true : false;

            returnComponent = (
                <MaxWidthWrap>
                    <NiceTitle title={currentComponent?.Title} subtitle={currentComponent?.GraphicTitle} text={currentComponent?.TextUnderTitle?.length ? currentComponent.TextUnderTitle : ''} />


                    <div className={cSTherapist.wrap}>
                        {allTherapist.map((therapist, index) => (
                            <TherapistList blockData={therapist.node} key={index} />
                        ))}
                    </div>


                    {!isLongList && hasButtonText && hasEnoughtTherapist &&
                        <div className={cSTherapist.buttonWrap}>
                            <Link to='/terapeuti' className={cSTherapist.button}>{currentComponent.ButtonText}</Link>
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
                        {currentComponent.text_with_photo_effects.map((el, index) => (
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

    return (
        <RootLayout siteData={data.strapiSettings} siteUrlMap={pageContext.pagesUrlMap} siteMenu={data.strapiMenuHeader}>

            <Helmet>
                <meta charSet="utf-8" />
                <title>{currentPageTitle}</title>
            </Helmet>
            <main>
                {data.strapiPages.DynamicComponent.map((component, index) => (
                    <div key={index}>
                        {getRightComponent(component)}
                    </div>
                ))}
            </main>

            <Footer blockData={data.strapiSettings} menuData={data.strapiMenuFooter} siteUrlMap={pageContext.pagesUrlMap} socialSites={data.strapiSettings.social_media_sites} />
        </RootLayout>
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
            DynamicComponent {
                GraphicTitle
                TextUnderTitle
                Title
                HasNewsList
                HasTherapistList
                id
                IsLongList
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
        allStrapiTherapists {
            edges {
              node {
                    id
                    Url
                    Name
                    Perex
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
        allStrapiNews {
            edges {
                node {
                    Perex
                    Title
                    Url
                    created_at
                    news_tags {
                        Title
                        id
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