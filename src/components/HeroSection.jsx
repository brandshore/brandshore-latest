import React from "react"
import Typewriter from "typewriter-effect"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import _ from "lodash"
import "../css/wave.css"

export default function HeroSection(props) {
  let section = _.get(props, "section", null)
  return (
    <section
      className="content__row content__row--full-width promo__section"
      data-id={_.get(section, "section_id", null)}
    >
      <h1 class="text-xl sm:text-center my-20">
        <Typewriter
          options={{
            strings: [
              _.get(section, "looptext_1", null),
              _.get(section, "looptext_2", null),
              _.get(section, "looptext_3", null),
              _.get(section, "looptext_4", null),
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
      <div className="hero-wave">
        <div class="ocean">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
      </div>
    </section>
  )
}
