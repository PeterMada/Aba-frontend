import React from 'react';

import { graphql } from 'gatsby';

import RootLayout from './../components/RootLayout/RootLayout';
import Footer from './../components/Footer/Footer';
import PersonDetail from './../components/PersonDetail/PersonDetail';


export default ({ data, pageContext }) => {
    return (
        <RootLayout siteData={data.strapiSettings} siteUrlMap={pageContext.pagesUrlMap} siteMenu={data.strapiMenuHeader}>

            <main>
                <PersonDetail blockData={data.strapiTherapists} />
            </main>

            <Footer blockData={data.strapiSettings} menuData={data.strapiMenuFooter} siteUrlMap={pageContext.pagesUrlMap} socialSites={data.strapiSettings.social_media_sites} />
        </RootLayout >
    )
}


export const pageQuery = graphql`
    query singleTherapist($pageId: String!) {
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
    }`;