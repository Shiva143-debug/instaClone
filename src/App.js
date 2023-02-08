import './App.css'
import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'
import SearchContext from './Context/SearchContext'

class App extends Component {
  state = {
    searchInput: '',
    isClicked: false,
    searchPostView: false,
    searchValue: false,
  }

  closeHeaderButtonIn = () => {
    this.setState(prev => ({isClicked: !prev.isClicked}))
  }

  onChangeSearchInput = input => {
    this.setState({searchInput: input})
  }

  setSearchInput = () => {
    this.setState(prev => ({searchPostView: !prev.searchPostView}))
  }

  moreOptions = () => {
    this.setState(prev => ({isClicked: !prev.isClicked}))
  }

  searchBox = () => {
    this.setState(prev => ({
      searchValue: !prev.searchValue,
      isClicked: !prev.isClicked,
    }))
  }

  render() {
    const {searchInput, searchPostView, isClicked, searchValue} = this.state

    return (
      <SearchContext.Provider
        value={{
          searchInput,
          isClicked,
          searchPostView,
          searchValue,
          onChangeSearchInput: this.onChangeSearchInput,
          setSearchInput: this.setSearchInput,
          onMoreOptionsState: this.moreOptions,
          searchBox: this.searchBox,
          closeHeaderButtonIn: this.closeHeaderButtonIn,
        }}
      >
        <Switch>
          <Route exact to path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute path="/users/:userId" component={UserProfile} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
