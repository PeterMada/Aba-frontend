import React from 'react';
import { graphql } from 'gatsby';

import RootLayout from './../components/RootLayout/RootLayout';
import SingleNews from './../components/SingleNews/SingleNews';
import SmallBanner from './../components/SmallBanner/SmallBanner';
import Footer from './../components/Footer/Footer';

export default ({ data, pageContext }) => {

    return (
        <RootLayout siteData={data.strapiSettings} siteUrlMap={pageContext.pagesUrlMap} siteMenu={data.strapiMenuHeader}>
            <SmallBanner blockData={data.strapiNews.MainImage} />
            <main>
                <SingleNews blockData={data.strapiNews} />
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
            }
        }
        strapiNews(id: {eq: $pageId}) {
            id
            Title
            Perex
            Text
            strapiId
            created_at
            created_by {
                firstname
                lastname
            }
            updated_at
            updated_by{
                firstname
                lastname
            }
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
    }`;