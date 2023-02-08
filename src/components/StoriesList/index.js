import Slider from 'react-slick'
import {Component} from 'react'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
}

class StoriesList extends Component {
  renderSlider = data => (
    <Slider {...settings}>
      {data.map(eachLogo => {
        const {userName, storyUrl, userId} = eachLogo
        return (
          <div className="slick-item" key={userId}>
            <img className="logo-image" src={storyUrl} alt="user story" />
            <p className="story-name">{userName}</p>
          </div>
        )
      })}
    </Slider>
  )

  render() {
    const {storiesList} = this.props

    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider(storiesList)}</div>
      </div>
    )
  }
}

export default StoriesList
