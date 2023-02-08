import {BsGrid3X3} from 'react-icons/bs'

import MyStories from '../MyStories'
import MyPosts from '../MyPosts'
import './index.css'

const MyInfo = props => {
  const {userDetails} = props
  console.log(userDetails)
  const {profile} = userDetails
  const {stories, posts} = profile

  const {
    userId,
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    postsCount,
  } = profile

  return (
    <>
      <li className="Profile-card">
        <div className="profile-details">
          <h1 className="profile-head">{userName}</h1>
          <div className="profilePic-post-following">
            <img src={profilePic} alt="my profile" className="Profile-pic" />
            <div className="post-details">
              <p className="count-follower">
                <span className="highlight">{postsCount}</span>Posts
              </p>
              <p className="count-follower">
                <span className="highlight">{followersCount} </span> Followers
              </p>
              <p className="count-follower">
                <span className="highlight">{followingCount} </span> Following
              </p>
            </div>
          </div>
          <p className="bio-name">{userId}</p>
          <p className="bio">{userBio}</p>
        </div>
        <ul className="user-stories">
          {stories.map(each => (
            <MyStories key={each.id} item={each} />
          ))}
        </ul>
        <hr className="line" />
        <div className="posts-container-user">
          <div className="head-container">
            <BsGrid3X3 className="post-logo" />
            <h1 className="post-head">Posts</h1>
          </div>
          <MyPosts postDetails={posts} />
        </div>
      </li>
    </>
  )
}
export default MyInfo
