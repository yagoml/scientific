import React, { Component } from 'react'
import DataTable from '../../components/favorites/DataTable'

export default class Favorites extends Component {
  private pageTitle: string = 'Artigos favoritos'

  render() {
    return (
      <div className="favorites">
        <h1>{this.pageTitle}</h1>
        <DataTable />
      </div>
    )
  }
}
