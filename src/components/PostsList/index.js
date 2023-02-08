import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import PostItem from '../PostItem'
import SearchContext from '../../Context/SearchContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PostsList extends Component {
  state = {
    postsList: [],
    apiStatus: apiStatusConstants.initial,
    button: false,
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        likeStatus: false,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: {
          imageUrl: each.post_details.image_url,
          caption: each.post_details.caption,
        },
        likesCount: each.likes_count,
        comments: each.comments.map(eachItem => ({
          userName: eachItem.user_name,
          userId: eachItem.user_id,
          comment: eachItem.comment,
        })),
        createdAt: each.created_at,
      }))
      this.setState({
        postsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeLikeIcon = async postId => {
    this.setState(prev => ({
      button: !prev.button,
    }))
    const token = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const post = {like_status: true}
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
      method: 'POST',
    }
    await fetch(apiUrl, options)

    this.setState(prev => ({
      postsList: prev.postsList.map(each => {
        if (each.postId === postId) {
          return {
            ...each,
            likesCount: each.likesCount + 1,
            likeStatus: !each.likeStatus,
          }
        }
        return each
      }),
    }))
  }

  onChangeUnLikeIcon = async postId => {
    this.setState(prev => ({button: !prev.button}))
    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const post = {like_status: false}
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
      method: 'POST',
    }
    await fetch(apiUrl, options)
    this.setState(prev => ({
      postsList: prev.postsList.map(each => {
        if (each.postId === postId) {
          return {
            ...each,
            likesCount: each.likesCount - 1,
            likeStatus: !each.likeStatus,
          }
        }
        return each
      }),
    }))
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getPosts()
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

  renderStoriesListView = () => {
    const {postsList, button} = this.state
    console.log(postsList)

    return (
      <SearchContext.Provider
        value={{
          onChangeLikeIcon: this.onChangeLikeIcon,
          onChangeUnLikeIcon: this.onChangeUnLikeIcon,
        }}
      >
        <ul className="Posts-container-search">
          {postsList.map(each => (
            <PostItem key={each.postId} item={each} button={button} />
          ))}
        </ul>
      </SearchContext.Provider>
    )
  }

  renderPostsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderStoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderPostsView()
  }
}
export default PostsList
