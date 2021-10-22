import React from "react"
import _ from "lodash"
import { graphql } from "gatsby"
import Layout from "@components/layout"
import components from "../components/index"
import SEO from "@components/seo"
import "../css/global.css"

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query ($url: String) {
    sitePage(path: { eq: $url }) {
      id
    }
  }
`

export default props => {
  let header_search = _.get(
    props,
    "pageContext.frontmatter.header_search",
    null
  )

  return (
    <Layout {...props} header_search={header_search}>
      <SEO postSEO />
      <main className="home">
        {_.map(
          _.get(props, "pageContext.frontmatter.sections", null),
          (section, section_idx) => {
            let component = _.upperFirst(
              _.camelCase(_.get(section, "type", null))
            )
            let Component = components[component]
            return (
              <>
                <Component
                  key={section_idx}
                  {...props}
                  section={section}
                  page={props.pageContext}
                  site={props.pageContext.site}
                />
              </>
            )
          }
        )}
      </main>
    </Layout>
  )
}
