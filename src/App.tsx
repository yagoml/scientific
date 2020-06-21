import React from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { Provider } from 'react-redux'
import store from './store'
import { Router, Route } from 'react-router-dom'
import Articles from './components/Articles/Search'
import Container from 'react-bootstrap/Container'
import { createBrowserHistory } from 'history'

let history = createBrowserHistory()

function App() {
  return (
    <Container fluid className="app">
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Articles} exact />
        </Router>
      </Provider>
    </Container>
  )
}

export default App
