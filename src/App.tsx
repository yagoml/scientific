import React from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { Provider } from 'react-redux'
import store from './store'
import { Router, Route } from 'react-router-dom'
import Favorites from './views/Favorites'
import Container from 'react-bootstrap/Container'
import Search from './views/Search'
import AppHeader from './components/AppHeader'
import history from './history'

function App() {
  return (
    <div className="app">
      <Router history={history}>
        <Provider store={store}>
          <AppHeader />
          <Container fluid>
            <Route path="/" component={Search} exact />
            <Route path="/favorites" component={Favorites} />
          </Container>
        </Provider>
      </Router>
    </div>
  )
}

export default App
