import React from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route } from 'react-router-dom'
import Articles from './components/Articles'
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <Container fluid className="app">
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" component={Articles} exact />
        </BrowserRouter>
      </Provider>
    </Container>
  )
}

export default App
