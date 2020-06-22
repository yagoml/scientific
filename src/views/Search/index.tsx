import React, { Component } from 'react'
import ArticlesSearch from '../../components/articles/ArticlesSearch'

export default class Search extends Component {
  render() {
    return (
      <div className="search">
        <h1 className="search__title">Artigos científicos</h1>
        <ArticlesSearch />
      </div>
    )
  }
}
