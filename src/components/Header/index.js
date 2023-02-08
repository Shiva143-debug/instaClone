import './index.css'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {GoThreeBars} from 'react-icons/go'
import {AiFillCloseCircle} from 'react-icons/ai'
import SearchContext from '../../Context/SearchContext'

// import {Component} from 'react'

const Header = props => (
  <SearchContext.Consumer>
    {value => {
      const {
        searchInput,
        isClicked,
        onChangeSearchInput,
        setSearchInput,
        onMoreOptionsState,
        searchBox,
        searchValue,
        closeHeaderButtonIn,
      } = value

      const onLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const closeHeaderButton = () => {
        closeHeaderButtonIn()
      }

      const onMoreOptions = () => {
        onMoreOptionsState()
      }

      const ChangeSearchInput = event => {
        onChangeSearchInput(event.target.value)
      }

      const onsetSearchInput = () => {
        setSearchInput()
      }

      const searchContainerView = () => {
        searchBox()
      }

      const searchBoxContainer = () => (
        <div className="mobile-input-container">
          <input
            className="mobile-search-input"
            type="search"
            placeholder="Search Caption"
            onChange={ChangeSearchInput}
            value={searchInput}
          />
          <button
            className="search-button"
            testid="searchIcon"
            type="button"
            onClick={onsetSearchInput}
          >
            <FaSearch className="search-icon" />
          </button>
        </div>
      )

      const onMoreOptionELe = () => (
        <div className="options-container">
          <ul className="header-links">
            <li className="link-tag">
              <Link to="/" className="link">
                Home
              </Link>
            </li>

            <li className="link-tag">
              <Link to="/my-profile" className="link">
                Profile
              </Link>
            </li>

            <button
              className="search-option"
              type="button"
              onClick={searchContainerView}
            >
              Search
            </button>
          </ul>

          <button
            className="mobile-logout-button"
            type="button"
            onClick={onLogout}
          >
            Logout
          </button>

          <button
            className="close-button"
            type="button"
            onClick={closeHeaderButton}
          >
            <AiFillCloseCircle className="close-button" />
          </button>
        </div>
      )

      return (
        <div>
          <div className="mobile-header">
            <div className="logo-name">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1675668478/Standard_Collection_8_lbjbou.svg"
                  className="mobile-header-logo"
                  alt="website logo"
                />
              </Link>
              <h1 className="mobile-header-name">Insta Share</h1>
            </div>
            <div>
              <button
                className="med-button"
                type="button"
                onClick={onMoreOptions}
              >
                <GoThreeBars className="more-img" />
              </button>
            </div>
          </div>

          <div className="header">
            <div className="logo-name">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1675668478/Standard_Collection_8_lbjbou.svg"
                  className="header-logo"
                  alt="website logo"
                />
              </Link>
              <h1 className="header-name">Insta Share</h1>
            </div>

            <div className="search-home-profile-logout">
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search Caption"
                  onChange={ChangeSearchInput}
                  value={searchInput}
                />
                <button
                  type="button"
                  testid="searchIcon"
                  onClick={onsetSearchInput}
                >
                  <FaSearch />
                </button>
              </div>
              <ul className="home-profile">
                <li className="nav-menu-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>

                <li className="nav-menu-item">
                  <Link to="/my-profile" className="nav-link">
                    profile
                  </Link>
                </li>
              </ul>

              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          </div>
          {isClicked && onMoreOptionELe()}
          {searchValue && searchBoxContainer()}
        </div>
      )
    }}
  </SearchContext.Consumer>
)

export default withRouter(Header)
