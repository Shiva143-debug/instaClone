import {Component} from 'react'
// import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import UserInfo from '../UserInfo'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {
    userData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUsersData()
  }

  getUsersData = async () => {
    const {match} = this.props
    const {params} = match
    const {userId} = params
    console.log(userId)

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
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
          id: data.user_details.id,
          userId: data.user_details.user_id,
          userName: data.user_details.user_name,
          profilePic: data.user_details.profile_pic,
          followersCount: data.user_details.followers_count,
          followingCount: data.user_details.following_count,
          userBio: data.user_details.user_bio,
          postsCount: data.user_details.posts_count,
          posts: data.user_details.posts.map(each => ({
            id: each.id,
            image: each.image,
          })),
          stories: data.user_details.stories.map(each => ({
            id: each.id,
            image: each.image,
          })),
        },
      }

      this.setState({
        userData: updatedData,
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
    this.getUsersData()
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

  renderSuccessUserData = () => {
    const {userData} = this.state
    console.log(userData)

    return (
      <ul className="userInformation">
        <UserInfo key={userData.userId} userDetails={userData} />
      </ul>
    )
  }

  renderUserData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessUserData()
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
        {this.renderUserData()}
      </div>
    )
  }
}
export default UserProfile
