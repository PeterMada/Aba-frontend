/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const terapeutiUrl = 'terapeuti';

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        query pagesQuery {
            allStrapiPages {
                edges {
                    node {
                        Url
                        Title
                        id
                        strapiId
                        strapiParent {
                            id
                        }
                    }
                }
            }
            allStrapiNews {
                edges {
                    node {
                        id
                        Url
                    }
                }
            }
            allStrapiWorkshops {
                edges {
                    node {
                        id
                        Url
                    }
                }
            }
            allStrapiTherapists {
                edges {
                    node {
                        id
                        Url
                    }
                }
            }
            strapiSettings {
                ArticlesPage {
                  Url
                  id
                  parent
                }
                WorkshopPage {
                  Url
                  id
                  parent
                }
                TherapistPage {
                    Url
                    id
                    parent
                }
              }
        }
    `);

    // Create basic pages
    const urlMap = result.data.allStrapiPages.edges.map((page) => {
        const returnUrl = getUrl(result.data.allStrapiPages.edges, page.node);

        let finalUrl = returnUrl.split('#');
        finalUrl = finalUrl.reverse().join('/');
        finalUrl = finalUrl.replace('homepage/', '').replace('homepage', '');

        return {
            id: page.node.id,
            url: finalUrl
        };
    }, []);


    const articleUrl = findUrl(urlMap, result.data.strapiSettings.ArticlesPage.id);
    const workshopsUrl = findUrl(urlMap, result.data.strapiSettings.WorkshopPage.id);


    urlMap.map(page => {
        const basicTemplatePath = path.resolve(__dirname + '/src/templates/PageTemplate.js');
        let isArticleSignpostPage = false;
        let isWorkshopsSignpostPage = false;
        let isTherapistSignpostPage = false;

        if (page.url === result.data.strapiSettings.ArticlesPage.Url) {
            isArticleSignpostPage = true;
        }

        if (page.url === result.data.strapiSettings.WorkshopPage.Url) {
            isWorkshopsSignpostPage = true;
        }

        if (page.url === result.data.strapiSettings.TherapistPage.Url) {
            isTherapistSignpostPage = true;
        }


        createPage({
            path: `/${page.url}`,
            component: basicTemplatePath,
            context: {
                pageId: page.id,
                pagesUrlMap: urlMap,
                articlesUrl: articleUrl,
                workshopsUrl: workshopsUrl,
                isArticleSignpostPage: isArticleSignpostPage,
                isWorkshopsSignpostPage: isWorkshopsSignpostPage,
                isTherapistSignpostPage: isTherapistSignpostPage
            },
        });
    });


    // Create Article pages
    result.data.allStrapiNews.edges.map((page) => {

        if (page.node.Url != 'test') {
            createPage({
                path: `/${articleUrl}/${page.node.Url}`,
                component: path.resolve('./src/templates/NewsTemplate.js'),
                context: {
                    pageId: page.node.id,
                    pagesUrlMap: urlMap,
                    articlesUrl: articleUrl
                }
            });
        }
    });


    // Create Workshops pages
    result.data.allStrapiWorkshops.edges.map((page) => {

        if (page.node.Url != 'test') {
            createPage({
                path: `/${workshopsUrl}/${page.node.Url}`,
                component: path.resolve('./src/templates/WorkshopTemplate.js'),
                context: {
                    pageId: page.node.id,
                    pagesUrlMap: urlMap,
                    workshopsUrl: workshopsUrl
                }
            });
        }
    });

    // Create therapist pages
    result.data.allStrapiTherapists.edges.map((page) => {
        createPage({
            path: `/${terapeutiUrl}/${page.node.Url}`,
            component: path.resolve('./src/templates/TherapistTemplate.js'),
            context: {
                pageId: page.node.id,
                therapistPageId: parseInt(page.node.id.replace('Therapists_', '')),
                pagesUrlMap: urlMap
            }
        });
    });

}

// Login function
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions

    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/app/)) {
        page.matchPath = "/app/*"

        // Update the page.
        createPage(page)
    }
}

function findUrl(urlMap, pageId) {

    let returnUrl = urlMap.filter(page => {
        if (page.id === `Pages_${pageId}`) {
            return page.url;
        } else {
            return false;
        }
    });

    if (returnUrl.length === 1) {
        return returnUrl[0].url;
    }

    return false;
}

function getUrl(allPages, current) {
    let parentIdSettings = false;

    if (current.parent) {
        parentIdSettings = current.parent;
    }

    if (parentIdSettings == 4) {
    }

    if (current.strapiParent == null && parentIdSettings === false) {
        return current.Url;
    } else {
        let parentId = false;
        if (current.strapiParent) {
            parentId = current.strapiParent.id;
        }

        const parentNode = allPages.reduce((result, page) => {
            if (page.node.strapiId == parentId || page.node.strapiId == parentIdSettings) {
                result = page.node;
            }

            return result;
        }, []);

        return current.Url + '#' + getUrl(allPages, parentNode);
    }

};