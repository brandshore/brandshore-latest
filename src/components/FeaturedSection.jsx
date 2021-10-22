import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage as Img } from "gatsby-plugin-image"
import _ from "lodash"
import "../css/slick.css"

import loadable from "@loadable/component"
const Slider = loadable(() => import("react-slick"))

// const styles = {
//   wrapper: {
//     alignItems: `center`,
//     flexDirection: `row`,
//     width: `full`,
//     p: "0.6rem",
//   },
//   left: {
//     flexBasis: `58%`,
//   },
//   right: {
//     flexBasis: `42%`,
//     textAlign: `right`,
//   },
//   heading: {
//     color: `omegaDark`,
//     fontWeight: `normal`,
//     fontSize: ".875rem",
//   },
// };

var settings = {
  className: "center",
  dots: false,
  autoplay: true,
  arrows: false,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 5,
  speed: 500,
  slidesPerRow: 1,
  responsive: [
    {
      breakpoint: 1275,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

// // Randomizer
// featuredCard = featuredCard.sort(() => Math.random() - 0.5)

export default props => {
  let section = _.get(props, "section", null)

  let { featured } = useStaticQuery(graphql`
    query FeaturedQuery($dateFormat: String) {
      featured: allAirtable(
        limit: 20
        filter: {
          data: {
            status: { ne: "sold" }
            Sections: { eq: "Featured" }
            noimage: { eq: "true" }
          }
        }
      ) {
        edges {
          node {
            data {
              slug
              date(formatString: $dateFormat)
              title
              status
              price
              logo {
                localFiles {
                  id
                  childImageSharp {
                    gatsbyImageData(width: 300, placeholder: NONE)
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const isBrowser = typeof window !== "undefined"
  const [width, setWidth] = React.useState(isBrowser ? window.innerWidth : 0)

  React.useEffect(() => {
    if (!isBrowser) return false
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  // Randomizer
  featured = featured.edges.sort(() => Math.random() - 0.5)

  return (
    <section
      data-id={_.get(section, "section_id", null)}
      className="featured_section"
    >
      {width > 640 ? (
        <Slider {...settings}>
          {featured.map(
            ({
              node: {
                data: { title, logo, price, slug },
              },
            }) => (
              <div key={title}>
                {/* <FavoriteCardItems
                            name={title}
                            id={title}
                            price={price}
                            slug={slug}
                          /> */}
                <Link to={`/${slug}`} key={title}>
                  {logo ? (
                    <div
                      style={{
                        height: "10rem",
                        p: 3,
                        borderBottom: "1px solid #e7e8f3",
                      }}
                    >
                      <Img
                        alt="image"
                        image={
                          logo
                            ? logo.localFiles[0].childImageSharp.gatsbyImageData
                            : null
                        }
                      />
                    </div>
                  ) : (
                    <p
                      style={{
                        fontFamily: "batangas",
                        lineHeight: "0",
                      }}
                    >
                      {title}
                    </p>
                  )}
                </Link>
              </div>
            )
          )}
        </Slider>
      ) : (
        ""
      )}
    </section>
  )
}
