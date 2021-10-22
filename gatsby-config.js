const resolveConfig = require("tailwindcss/resolveConfig")
const tailwindConfig = require("./tailwind.config.js")
const siteMetadata = require("./site-metadata.json")

require("dotenv").config({
  path: `.env`,
})

const path = require("path")

// const domainQuery = `
//   {
//   allAirtable {
//     nodes {
//       data {
//         slug
//         domain
//       }
//       objectID: id
//     }
//   }
// }
// `

// const settings = {
//   attributesForFaceting: ["data.domain"],
// }

// const queries = [
//   {
//     query: domainQuery,
//     settings,
//     transformer: ({ data }) => data.allAirtable.nodes,
//   },
// ]

const { theme } = resolveConfig(tailwindConfig)

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-remark-page-creator`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": path.resolve(__dirname, "src/components"),
          "@layout": path.resolve(__dirname, "src/layout/"),
          "@blocks": path.resolve(__dirname, "src/blocks/"),
          "@helpers": path.resolve(__dirname, "src/helpers"),
          "@static": path.resolve(__dirname, "static"),
        },
        extensions: ["js", "jsx"],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-lodash`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-image`,
    `gatsby-transformer-remark`,
    `gatsby-source-data`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-preact`,
    // {
    //   resolve: `gatsby-plugin-algolia`,
    //   options: {
    //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_API_KEY,
    //     indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
    //     queries,
    //     chunkSize: 10000, // default: 1000
    //   },
    // },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY, // specify via env
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE, // specify via env
            tableName: process.env.AIRTABLE_TABLE_NAME, // specify via env
            // tableLinks: [`author`],
            mapping: { logo: `fileNode` },
          },
          // We can add other bases/tables here, too!
          //{
          //baseId: `AIRTABLE_BASE_ID`,
          //tableName: `Sides`
          //}
        ],
      },
    },
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
