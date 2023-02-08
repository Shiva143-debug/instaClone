import React from 'react'

const SearchContext = React.createContext({
  SearchInput: '',
  isClicked: false,
  searchPostView: false,
  searchValue: false,
  button: false,
  onChangeLikeIcon: () => {},
  onChangeUnLikeIcon: () => {},
  closeHeaderButtonIn: () => {},
  changeSearchValue: () => {},
  setSearchInput: () => {},
  onMoreOptionsState: () => {},
  searchBox: () => {},
})

export default SearchContext
