import React from 'react'
import Button from 'react-bootstrap/Button'
import history from '../../../history'
import PropTypes from 'prop-types'

interface PropTypes {
  variant: any
}

const BackLink = ({ variant = 'link' }: PropTypes) => (
  <Button variant={variant} onClick={history.goBack}>
    Voltar
  </Button>
)

BackLink.propTypes = {
  variant: PropTypes.string
}

export default BackLink
