import {BiCamera} from 'react-icons/bi'
import './index.css'

const MyPosts = props => {
  const {postDetails} = props

  const postsView = () => (
    <ul className="user-posts-container">
      {postDetails.map(each => (
        <li className="post-image-container" key={each.id}>
          <img src={each.image} alt="my post" className="post-image" />
        </li>
      ))}
    </ul>
  )

  const noPostView = () => (
    <div className="no-post-container">
      <BiCamera className="no-post-image" />
      <h1 className="no-post-head">No Posts Yet</h1>
    </div>
  )

  const correctView = () => {
    if (postDetails.length === 0) {
      return noPostView()
    }
    return postsView()
  }

  return correctView()
}
export default MyPosts
