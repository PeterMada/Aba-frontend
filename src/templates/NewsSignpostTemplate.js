import React from 'react';
import { graphql, Link } from 'gatsby';

import RootLayout from './../components/RootLayout/RootLayout';
import MaxWidthWrap from './../components/MaxWidthWrap/MaxWidthWrap';
import NewsList from './../components/NewsList/NewsList';
import Footer from './../components/Footer/Footer';

import cS from './NewsSignpostTemplate.module.scss';

import { getUser, isLoggedIn } from '../services/auth';

export default ({ data, pageContext }) => {

    return (
        <>

            {isLoggedIn() ? (

                <RootLayout siteData={data.strapiSettings} siteUrlMap={pageContext.pagesUrlMap} siteMenu={data.strapiMenuHeader}>

                    <MaxWidthWrap>
                        <div className={cS.list}>
                            {data.allStrapiNews.edges.map((singleNews, index) => {

                                if (singleNews.node.Url !== 'test') {
                                    return <NewsList key={`news-list-${index}`} blockData={singleNews.node} />
                                }

                                return null;
                            })}
                        </div>
                    </MaxWidthWrap>
                    <Footer blockData={data.strapiSettings} menuData={data.strapiMenuFooter} siteUrlMap={pageContext.pagesUrlMap} />
                </RootLayout>
            ) : (

                    <div style={{ margin: `0 auto`, textAlign: 'center', padding: `5rem 1rem` }}>
                        Pro zobrazení stránky se musíte <Link to="/app/login">přihlásit</Link>.
                    </div>
                )}
        </>
    );
}

export const pageQuery = graphql`
    query MyQuery {
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
        }
        strapiMenuHeader {
            Menu {
              MainPage {
                Url
                Title
                id
                TitleInMenu
              }
              SubmenuPages {
                Url
                Title
                id
                TitleInMenu
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
        allStrapiNews(filter: {Url: {ne: "test"}}) {
            edges {
                node {
                    Perex
                    Title
                    Url
                    created_at
                    tags {
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
    }  
`;