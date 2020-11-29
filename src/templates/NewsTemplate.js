import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from "react-helmet"

import RootLayout from './../components/RootLayout/RootLayout';
import SingleNews from './../components/SingleNews/SingleNews';
import NewsList from '../components/NewsList/NewsList';
import Footer from './../components/Footer/Footer';
import MaxWidthWrap from '../components/MaxWidthWrap/MaxWidthWrap';

import cSNews from './NewsSignpostTemplate.module.scss';

export default ({ data, pageContext }) => {
    const keywords = data.strapiNews.MetaKeywords ? data.strapiNews.MetaKeywords : '';
    const description = data.strapiNews.MetaDescription ? data.strapiNews.MetaDescription : '';
    const currentPageTitle = `${data.strapiNews.Title} - ${data.strapiSettings.SiteName}`;

    // TODO #2 @PeterMada
    const allNews = data.allStrapiNews.edges.filter((el, index) => {
        return (el.node.id !== data.strapiNews.id);
    });

    let returnComponent = (
        <MaxWidthWrap>
            <div className={cSNews.list}>
                {allNews.map((singleNews, index) => (
                    <NewsList blockData={singleNews.node} key={index} />
                ))}
            </div>
        </MaxWidthWrap>
    );


    const getName = (name) => {
        const titleBefore = name.TitleBefore ? name.TitleBefore : '';
        const titleAfter = name.TitleAfter ? name.TitleAfter : '';

        return `${titleBefore}${name.Name}${titleAfter}`;
    }

    return (
        <RootLayout siteData={data.strapiSettings} siteUrlMap={pageContext.pagesUrlMap} siteMenu={data.strapiMenuHeader}>

            <Helmet>
                <title>{currentPageTitle}</title>
                <meta name="description" content={keywords} />
                <meta name="keywords" content={description} />
                {data.strapiNews.author !== null ? (
                    <meta name="author" content={getName(data.strapiNews.author)} />
                ) : ('')}
            </Helmet>

            <main>
                <SingleNews blockData={data.strapiNews} allNews={allNews} />
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
            MetaKeywords
            MetaDescription
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
            author{
                id
                TitleBefore
                TitleAfter
                Name
                Url
            }
        }
        allStrapiNews(limit: 6) {
            edges {
                node {
                    id
                    Perex
                    Title
                    Url
                    created_at
                    news_tags {
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