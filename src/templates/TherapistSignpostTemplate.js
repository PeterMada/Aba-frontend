import React from 'react';

import { graphql } from 'gatsby';

import RootLayout from './../components/RootLayout/RootLayout';
import MaxWidthWrap from './../components/MaxWidthWrap/MaxWidthWrap';
import TherapistList from './../components/Therapist/TherapistList';
import SmallBanner from './../components/SmallBanner/SmallBanner';
import Footer from './../components/Footer/Footer';

import cS from './TherapistSignpostTemplate.module.scss';

export default ({ data, pageContext }) => {

    return (
        <RootLayout siteData={data.strapiSettings} siteUrlMap={pageContext.pagesUrlMap} siteMenu={data.strapiMenuHeader}>

            <h1 className={cS.title}>Terapeuti</h1>

            <MaxWidthWrap>
                <div className={cS.wrap}>
                    {data.allStrapiTherapists.edges.map((therapist, index) => (
                        <TherapistList blockData={therapist.node} key={index} />
                    ))}
                </div>
            </MaxWidthWrap>

            <Footer blockData={data.strapiSettings} menuData={data.strapiMenuFooter} siteUrlMap={pageContext.pagesUrlMap} />
        </RootLayout>
    )

}

export const pageQuery = graphql`
    query TherapistSignpostQuery {
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
              }
              SubmenuPages {
                Url
                Title
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
    }  
`;