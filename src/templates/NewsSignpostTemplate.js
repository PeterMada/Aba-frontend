import React from 'react';
import { graphql, Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import RootLayout from './../components/RootLayout/RootLayout';
import MaxWidthWrap from './../components/MaxWidthWrap/MaxWidthWrap';
import NewsList from './../components/NewsList/NewsList';
import Footer from './../components/Footer/Footer';

import cS from './NewsSignpostTemplate.module.scss';

import { getUser, isLoggedIn } from '../services/auth';

export default ({ data, pageContext }) => {

  return (
    <>
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