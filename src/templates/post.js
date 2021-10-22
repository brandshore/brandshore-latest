import React from "react"
import { graphql } from "gatsby"

export default function post(props) {
  const { data } = props
  const { domain } = data.item.data

  return <>{domain}</>
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    item: airtable(data: { slug: { eq: $slug } }) {
      data {
        domain
        slug
      }
    }
  }
`
