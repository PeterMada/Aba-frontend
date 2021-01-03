/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const newsUrl = 'clanky';
const terapeutiUrl = 'terapeuti';

// You can delete this file if you're not using it
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
            allStrapiTherapists {
                edges {
                    node {
                        id
                        Url
                    }
                }
            }
        }
    `);

    /*
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
            allStrapiTherapists {
                edges {
                    node {
                        id
                        Url
                    }
                }
            }
        }
    `);
    */

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


    urlMap.map(page => {
        const basicTemplatePath = path.resolve(__dirname + '/src/templates/PageTemplate.js');
        let currentTemplate = basicTemplatePath;
        let isNewsSignpostPage = false;

        if (page.url === newsUrl) {
            isNewsSignpostPage = true;
            // currentTemplate = newsSignpostPath;
        }

        if (page.url === terapeutiUrl) {
            //currentTemplate = therapistSignpostPath;
        }


        createPage({
            path: `/${page.url}`,
            component: currentTemplate,
            context: {
                pageId: page.id,
                pagesUrlMap: urlMap,
                isNewsSignpost: isNewsSignpostPage
            },
        });
    });


    // Create news pages
    result.data.allStrapiNews.edges.map((page) => {

        if (page.node.Url != 'test') {
            createPage({
                path: `/${newsUrl}/${page.node.Url}`,
                component: path.resolve('./src/templates/NewsTemplate.js'),
                context: {
                    pageId: page.node.id,
                    pagesUrlMap: urlMap
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

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
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

function getUrl(allPages, current) {

    if (current.strapiParent == null) {
        return current.Url;
    } else {
        const parentId = current.strapiParent.id;
        const parentNode = allPages.reduce((result, page) => {
            if (page.node.strapiId == parentId) {
                result = page.node;
            }

            return result;
        }, []);

        return current.Url + '#' + getUrl(allPages, parentNode);
    }

};