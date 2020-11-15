let apiUrl = 'https://aba-strapi-api.herokuapp.com';

if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  });

  apiUrl = process.env.GATSBY_API_URL;
}

apiUrl = 'https://aba-strapi-api.herokuapp.com';

module.exports = {
  siteMetadata: {
    title: `ABA Brno`,
    description: `ABA BRNO`,
    author: `Peter Mada`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: apiUrl,
        queryLimit: 100, // Default to 100
        contentTypes: [`pages`, `sliders`, `Text-Block-With-Image`, `news`, `text-blocks`, `Therapists`, `Text-On-Images`, `news-tags`, `text-on-sliders`, `Text-with-photo-effects`, `Social-media-sites`],
        singleTypes: [`settings`, `menu-footer`, `menu-header`],
        // Possibility to login with a strapi user, when content types are not publically available (optional).
        loginData: {
          identifier: "",
          password: "",
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
