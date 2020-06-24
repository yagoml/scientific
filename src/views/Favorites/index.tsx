import React from 'react'
import DataTable from '../../components/Favorites/DataTable'
import BackLink from '../../components/Common/BackLink'

const pageTitle = 'Artigos favoritos'

const Favorites = () => {
  return (
    <div className="favorites">
      <div className="d-flex align-items-center">
        <h1 className="mb-4 mr-5">{pageTitle}</h1>
        <BackLink />
      </div>
      <DataTable />
    </div>
  )
}

export default Favorites
