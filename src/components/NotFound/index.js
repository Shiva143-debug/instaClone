import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1675779106/erroring_1_tf5c9p.jpg"
      alt="page not found"
      className="not-found-img"
    />
    <h1>Page Not Found</h1>
    <p className="notFound-para">
      we are sorry, the page you requested could not be found.Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="notFound-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
