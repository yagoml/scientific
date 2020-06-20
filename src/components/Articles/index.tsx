import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, Action } from 'redux'
import { ApplicationState } from './../../store/index'
import { Article } from '../../store/ducks/articles/types'
import * as ArticlesActions from '../../store/ducks/articles/actions'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import { Star } from 'react-bootstrap-icons'
import './style.scss'

interface StateProps {
  articles: Article[]
  loading: boolean
}

interface DispathProps {
  loadRequest(query: string): Action
}

interface LocalState {
  searchTerms: string
}

type Props = StateProps & DispathProps

class Articles extends Component<Props, LocalState> {
  constructor(props: Props) {
    super(props)
    this.state = { searchTerms: '' }
  }

  render() {
    const { articles, loading } = this.props

    return (
      <Container className="articles">
        <Form onSubmit={this.search} className="mb-5">
          <Form.Label>Pesquisar artigos</Form.Label>
          <Form.Control
            type="text"
            placeholder="Palavra(s) chave"
            value={this.state.searchTerms}
            onChange={this.handleChange}
          />
          <Form.Text className="text-muted">
            Pesquise por <strong>título, descrição ou autores</strong>
          </Form.Text>
          <Button variant="primary" type="submit" className="mt-2">
            Pesquisar
          </Button>
        </Form>

        {loading && (
          <div className="d-flex flex-column align-items-center justify-content-center loading">
            <div className="loading__txt mb-2 text-primary">
              Buscando artigos...
            </div>
            <Spinner animation="border" role="status" variant="primary">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}

        {articles.length > 0 && !loading && (
          <Table hover className="articles__table">
            <thead>
              <tr>
                <th>Autores</th>
                <th>Tipo</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>URL</th>
                <th>Favorito</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article.id}>
                  <td>{article.authors}</td>
                  <td>{article.types}</td>
                  <td>{article.title}</td>
                  <td>{article.description}</td>
                  <td>
                    <a href={article.downloadUrl}>{article.downloadUrl}</a>
                  </td>
                  <td>
                    <Star color="royalblue" size={24} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    )
  }

  search = (event: React.FormEvent) => {
    event.preventDefault()
    const { loadRequest } = this.props
    loadRequest(this.state.searchTerms)
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerms: event.target.value })
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  articles: state.articles.data,
  loading: state.articles.loading
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ArticlesActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
