import React from "react"
import { graphql } from "gatsby"

export default function post(props) {
  const { data } = props
  const {
    title,
    price,
    logo,
    font,
    possible_uses,
    Afternic,
    Dan,
    Escrow,
    Make_Offer,
    description,
  } = data.item.data

  return <>{title}</>
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $dateFormat: String) {
    item: airtable(data: { slug: { eq: $slug } }) {
      data {
        title
        price
        font
        slug
        Afternic
        Escrow
        Make_Offer
        Dan
        possible_uses
        description
        date(formatString: $dateFormat)
        logo {
          localFiles {
            id
            url
            childImageSharp {
              gatsbyImageData(width: 300, placeholder: NONE)
            }
          }
        }
      }
    }
  }
`
