import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

const AppHeader = () => {
  return (
    <div className="d-flex align-items-center app-header">
      <Link to="/" title="Scientific (Busca)">
        <img src="logo.png" className="app-header__logo" alt="logo" />
      </Link>
      <Link to="/favorites" className="app-header__link">
        Artigos favoritos
      </Link>
    </div>
  )
}

export default AppHeader
