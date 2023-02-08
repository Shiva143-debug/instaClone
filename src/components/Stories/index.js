import {Component} from 'react'
import './index.css'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import StoriesList from '../StoriesList'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Stories extends Component {
  state = {
    storiesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getStories()
  }

  getStories = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.users_stories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      this.setState({
        storiesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getStories()
  }

  renderFailureView = () => (
    <div className="post-error-view-container">
      <img
        src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1675693453/Icon_zwosxc.svg"
        alt="failure view"
        className="failure-img"
      />
      <p className="post-failure-heading-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.onClickTryAgain}
      >
        Try again
      </button>
    </div>
  )

  renderSuccessView = () => {
    // const {storiesList} = this.state
    // return (
    //   <Slider {...settings}>
    //     {storiesList.map(eachLogo => {
    //       const {userId, storyUrl, userName} = eachLogo
    //       return (
    //         <div className="slick-container">
    //           <div className="slick-item" key={userId}>
    //             <img className="logo-image" src={storyUrl} alt="user story" />
    //             <p className="userName">{userName}</p>
    //           </div>
    //         </div>
    //       )
    //     })}
    //   </Slider>
    // )

    const {storiesList} = this.state

    return <StoriesList storiesList={storiesList} />
  }

  renderSliderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderSliderView()
  }
}
export default Stories
