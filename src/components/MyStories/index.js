const MyStories = props => {
  const {item} = props
  const {image} = item

  return (
    <li className="story-container">
      <img src={image} alt="my story" className="story-image" />
    </li>
  )
}
export default MyStories
