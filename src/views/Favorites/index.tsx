import React, { Component } from 'react'
import DataTable from '../../components/favorites/DataTable'
import BackLink from '../../components/common/BackLink'

export default class Favorites extends Component {
  private pageTitle: string = 'Artigos favoritos'

  render() {
    return (
      <div className="favorites">
        <div className="d-flex align-items-center">
          <h1 className="mb-4">{this.pageTitle}</h1>
          <BackLink />
        </div>
        <DataTable />
      </div>
    )
  }
}
