import {Component} from 'react'
// import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MyInfo from '../MyInfo'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {
    myData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMyData()
  }

  getMyData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        profile: {
          id: data.profile.id,
          userId: data.profile.user_id,
          userName: data.profile.user_name,
          profilePic: data.profile.profile_pic,
          followersCount: data.profile.followers_count,
          followingCount: data.profile.following_count,
          userBio: data.profile.user_bio,
          postsCount: data.profile.posts_count,
          posts: data.profile.posts.map(each => ({
            id: each.id,
            image: each.image,
          })),
          stories: data.profile.stories.map(each => ({
            id: each.id,
            image: each.image,
          })),
        },
      }

      this.setState({
        myData: updatedData,
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
    this.getMyData()
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

  renderSuccessMyData = () => {
    const {myData} = this.state
    console.log(myData)

    return (
      <ul className="userInformation">
        <MyInfo userDetails={myData} />
      </ul>
    )
  }

  renderMyData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessMyData()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="userProfile">
        <Header />
        {this.renderMyData()}
      </div>
    )
  }
}
export default MyProfile
