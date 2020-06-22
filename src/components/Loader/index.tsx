import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import './style.scss'

export default class index extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center loader">
        <div className="loader__txt mb-2">Buscando artigos...</div>
        <Spinner animation="border" role="status" variant="warning">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    )
  }
}
