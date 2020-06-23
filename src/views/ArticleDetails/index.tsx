import React, { Component } from 'react'
import Details from '../../components/articles/Details'
import BackLink from '../../components/common/BackLink'

export default class ArticlesDetails extends Component {
  render() {
    return (
      <div>
        <div className="d-flex align-items-center">
          <h1>Detalhes de Artigo</h1>
          <BackLink />
        </div>
        <Details />
      </div>
    )
  }
}
