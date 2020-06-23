import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import history from '../../../history'

export default class BackLink extends Component {
  render() {
    return (
      <Button variant="link" onClick={history.goBack}>
        Voltar
      </Button>
    )
  }
}
