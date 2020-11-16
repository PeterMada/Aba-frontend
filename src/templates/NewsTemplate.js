import React from 'react';
import { graphql } from 'gatsby';

import RootLayout from './../components/RootLayout/RootLayout';
import SingleNews from './../components/SingleNews/SingleNews';
import NewsList from '../components/NewsList/NewsList';
import SmallBanner from './../components/SmallBanner/SmallBanner';
import Footer from './../components/Footer/Footer';
import MaxWidthWrap from '../components/MaxWidthWrap/MaxWidthWrap';

import cSNews from './NewsSignpostTemplate.module.scss';

export default ({ data, pageContext }) => {
    console.log(data);
    console.log(pageContext);

    const allNews = data.allStrapiNews.edges.filter((el, index) => index < 4);

    let returnComponent = (
        <MaxWidthWrap>
            <div className={cSNews.list}>
                {allNews.map((singleNews, index) => (
                    <NewsList blockData={singleNews.node} key={index} />
                ))}
            </div>
        </MaxWidthWrap>
    );

    return (
        <RootLayout siteData={data.strapiSettings} siteUrlMap={pageContext.pagesUrlMap} siteMenu={data.strapiMenuHeader}>
            <SmallBanner blockData={data.strapiNews.MainImage} />
            <main>
                <SingleNews blockData={data.strapiNews} />
                {returnComponent}
            </main>
            <Footer blockData={data.strapiSettings} menuData={data.strapiMenuFooter} siteUrlMap={pageContext.pagesUrlMap} socialSites={data.strapiSettings.social_media_sites} />
        </RootLayout >
    )
}

export const pageQuery = graphql`
    query singleNews($pageId: String!) {
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
        strapiNews(id: {eq: $pageId}) {
            id
            Title
            Perex
            Text
            strapiId
            created_at
            updated_at
            news_tags {
                Title
                id
            }
            MainImage {
                childImageSharp {
                    fluid(maxWidth: 2500) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
            ImgGallery {
                id
                url
                alternativeText
            }
        }
        allStrapiNews(limit: 5) {
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