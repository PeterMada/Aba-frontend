import React from 'react';
import { graphql } from 'gatsby';

import RootLayout from './../components/RootLayout/RootLayout';
import MaxWidthWrap from './../components/MaxWidthWrap/MaxWidthWrap';
import SmallBanner from './../components/SmallBanner/SmallBanner';
import NewsList from './../components/NewsList/NewsList';
import Footer from './../components/Footer/Footer';

import cS from './NewsSignpostTemplate.module.scss';

export default ({ data, pageContext }) => {
    return (
        <RootLayout siteData={data.strapiSettings} siteUrlMap={pageContext.pagesUrlMap} siteMenu={data.strapiMenuHeader}>

            <h1 className={cS.title}>Novinky</h1>

            <MaxWidthWrap>
                <div className={cS.list}>
                    {data.allStrapiNews.edges.map((singleNews, index) => (
                        <NewsList key={`news-list-${index}`} blockData={singleNews.node} />
                    ))}
                </div>
            </MaxWidthWrap>
            <Footer blockData={data.strapiSettings} menuData={data.strapiMenuFooter} siteUrlMap={pageContext.pagesUrlMap} />
        </RootLayout>
    );
}

export const pageQuery = graphql`
    query MyQuery {
        strapiSettings {
            SiteName
            Copyright
            SiteLogo {
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
    }  
`;