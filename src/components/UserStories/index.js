import './index.css'

const UserStories = props => {
  const {item} = props
  const {image} = item

  return (
    <li className="story-container">
      <img src={image} alt="user story" className="story-image" />
    </li>
  )
}
export default UserStories
