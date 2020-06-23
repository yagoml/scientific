import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import './style.scss'

const Loader = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center loader">
      <div className="loader__txt mb-2">Buscando artigo(s)...</div>
      <Spinner animation="border" role="status" variant="warning">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
