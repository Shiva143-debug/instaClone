// import {Component} from 'react'

import './index.css'

import Header from '../Header'
import SearchContext from '../../Context/SearchContext'
import Stories from '../Stories'
import PostsList from '../PostsList'
import SearchPosts from '../SearchPosts'

const Home = () => (
  <SearchContext.Consumer>
    {value => {
      const {searchInput, searchPostView} = value

      return (
        <>
          <Header />
          <div className="Home-container">
            {searchPostView ? (
              <SearchPosts input={searchInput} />
            ) : (
              <>
                <Stories />
                <PostsList />
              </>
            )}
          </div>
        </>
      )
    }}
  </SearchContext.Consumer>
)
export default Home
