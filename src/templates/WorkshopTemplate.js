import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from "react-helmet"

import RootLayout from '../components/RootLayout/RootLayout';
import SingleNews from '../components/SingleNews/SingleNews';
import NewsList from '../components/NewsList/NewsList';
import Footer from '../components/Footer/Footer';
import MaxWidthWrap from '../components/MaxWidthWrap/MaxWidthWrap';

import cSNews from './NewsSignpostTemplate.module.scss';

import { getUser, isLoggedIn } from '../services/auth';

export default ({ data, pageContext }) => {
    const keywords = data.strapiWorkshops.MetaKeywords ? data.strapiWorkshops.MetaKeywords : '';
    const description = data.strapiWorkshops.MetaDescription ? data.strapiWorkshops.MetaDescription : '';
    const currentPageTitle = `${data.strapiWorkshops.Title} - ${data.strapiSettings.SiteName}`;

    const allNews = data.allStrapiWorkshops.edges.filter((el, index) => {
        return (el.node.id !== data.strapiWorkshops.id);
    });

    let returnComponent = (
        <MaxWidthWrap>
            <div className={cSNews.list}>
                {allNews.map((singleNews, index) => (
                    <NewsList blockData={singleNews.node} key={index} articleUrl={pageContext.workshopsUrl} therapistUrl={pageContext.therapistUrl} />
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
        <>

            {isLoggedIn() ? (

                <RootLayout siteData={data.strapiSettings} siteUrlMap={pageContext.pagesUrlMap} siteMenu={data.strapiMenuHeader}>

                    <Helmet>
                        <title>{currentPageTitle}</title>
                        <meta name="description" content={keywords} />
                        <meta name="keywords" content={description} />
                        {data.strapiWorkshops.author !== null ? (
                            <meta name="author" content={getName(data.strapiWorkshops.author)} />
                        ) : ('')}
                    </Helmet>

                    <main>
                        <SingleNews blockData={data.strapiWorkshops} allNews={allNews} pageUrl={pageContext.workshopsUrl} therapistUrl={pageContext.therapistUrl} />
                    </main>
                    <Footer blockData={data.strapiSettings} menuData={data.strapiMenuFooter} siteUrlMap={pageContext.pagesUrlMap} socialSites={data.strapiSettings.social_media_sites} />
                </RootLayout >
            ) : (

                <div style={{ margin: `0 auto`, textAlign: 'center', padding: `5rem 1rem` }}>
                    Pro zobrazení stránky se musíte <Link to="/app/login">přihlásit</Link>.
                </div>
            )}

        </>
    )
}

export const pageQuery = graphql`
    query singleWorkshop ($pageId: String!) {
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
        strapiWorkshops(id: {eq: $pageId}) {
            id
            Title
            Perex
            Text
            strapiId
            created_at
            updated_at
            MetaKeywords
            MetaDescription
            tags {
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
        allStrapiWorkshops(filter: {Url: {ne: "test"}}, limit: 6) {
            edges {
                node {
                    id
                    Perex
                    Title
                    Url
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