require("dotenv").config()
const path = require(`path`)
const { AIRTABLE_TABLE_NAME: tableName } = process.env

const blogPostTemplate = require.resolve(`./src/templates/post.js`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allAirtable(filter: { table: { eq: "${tableName}" } }) {
        nodes {
          data {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading posts`, result.errors)
    return
  }

  const posts = result.data.allAirtable.nodes

  posts.forEach(post => {
    createPage({
      path: post.data.slug,
      component: blogPostTemplate,
      context: {
        slug: post.data.slug,
      },
      defer: true,
    })
  })
}

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions

//   return new Promise((resolve, reject) => {
//     graphql(`
//       {
//         allAirtable(filter: { table: { eq: "${tableName}" } }) {
//           nodes {
//             data {
//               slug
//             }
//           }
//         }
//       }
//     `).then(({ errors, data }) => {
//       if (errors) {
//         reject(errors)
//       }

//       const component = path.resolve(`./src/templates/post.js`)

//       data.allAirtable.nodes.map(({ data: { slug } }) => {
//         createPage({
//           component,
//           context: { slug },
//           path: `/${slug}`,
//           defer: true,
//         })
//       })

//       resolve()
//     })
//   })
// }

// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage } = actions

//   createPage({
//     ...page,
//     context: {
//       ...page.context,
//       tableName,
//     },
//   })
// }
