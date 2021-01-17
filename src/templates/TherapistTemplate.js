import React from 'react';

import { graphql, Link } from 'gatsby';

import RootLayout from './../components/RootLayout/RootLayout';
import Footer from './../components/Footer/Footer';
import PersonDetail from './../components/PersonDetail/PersonDetail';
import NewsList from './../components/NewsList/NewsList'
import MaxWidthWrap from '../components/MaxWidthWrap/MaxWidthWrap';

import cSNews from './NewsSignpostTemplate.module.scss';
import cSTherapist from './TherapistSignpostTemplate.module.scss';


import { getUser, isLoggedIn } from '../services/auth';


export default ({ data, pageContext }) => {
    const allNews = data?.allStrapiNews?.edges;

    return (
        <>

            {isLoggedIn() ? (
                <RootLayout siteData={data.strapiSettings} siteUrlMap={pageContext.pagesUrlMap} siteMenu={data.strapiMenuHeader}>

                    <main>
                        <PersonDetail blockData={data.strapiTherapists} />


                        <MaxWidthWrap>
                            <div className={cSNews.list}>
                                {allNews.map((singleNews, index) => {
                                    if (singleNews.node.Url !== 'test') {
                                        return <NewsList blockData={singleNews.node} key={index} />
                                    }
                                })}
                            </div>


                            {allNews.length > 0 ? (
                                <div className={cSTherapist.buttonWrap}>
                                    <Link to='/clanky' className={cSTherapist.button}>Články</Link>
                                </div>
                            ) : null
                            }
                        </MaxWidthWrap>
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
    query singleTherapist($pageId: String!, $therapistPageId: Int!) {
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
        strapiTherapists(id: {eq: $pageId}) {
            id
            Name
            TitleBefore
            TitleAfter
            Perex
            strapiId
            Email
            TabText {
                Text
                Title
            }
            social_media_sites {
                Url
                Title
                Logo {
                    childImageSharp {
                        fixed(width: 26){
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
            TherapistImg {
                childImageSharp {
                    fluid(maxWidth: 2500) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
            price_list {
              TextAfterTable
              TextBeforeTable
              id
              PriceTable {
                LeftColumn
                RightColumn
                id
                IsEmpty
                IsHeading
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
        allStrapiNews(limit: 4,filter: {author: {id: {eq: $therapistPageId}}}) {
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