import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, Action } from 'redux'
import { ApplicationState } from './../../store/index'
import { Article, FetchArticlesPayload } from '../../store/ducks/articles/types'
import * as ArticlesActions from '../../store/ducks/articles/actions'
import * as FavoritesActions from '../../store/ducks/favorites/actions'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import { Star, Search, StarFill } from 'react-bootstrap-icons'
import './style.scss'
import { History, LocationState } from 'history'
import queryString from 'query-string'
import Pagination from '../Pagination'

interface StateProps {
  articles: Article[]
  total: number
  loading: boolean
  favorites: string[]
  history: History<LocationState>
  location: Location
}

interface DispathProps {
  fetchArticles(params: FetchArticlesPayload): Action
  addFavorite(id: string): Action
  removeFavorite(id: string): Action
  fetchFavorites(): Action
}

interface LocalState {
  searchTerms: string
}

interface QueryUri {
  searchTerms: string
  page: number
}

type Props = StateProps & DispathProps

class Articles extends Component<Props, LocalState> {
  constructor(props: Props) {
    super(props)
    const query = this.getQuery()
    this.state = {
      searchTerms: query.terms ? query.terms.toString() : ''
    }
  }

  componentDidMount() {
    const { fetchFavorites } = this.props
    fetchFavorites()
    if (this.state.searchTerms.length) this.search()
  }

  render() {
    const { articles, total, loading, favorites } = this.props

    return (
      <div className="articles">
        <div className="articles__header">
          <Form
            onSubmit={this.setTerms}
            className="position-relative articles__form mb-5"
          >
            <Form.Label>Pesquisar artigos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Palavra(s) chave"
              value={this.state.searchTerms}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              Pesquise por <strong>título, descrição</strong> ou{' '}
              <strong>autores</strong>
            </Form.Text>
            <Button
              variant="primary"
              type="submit"
              className="mt-3 position-absolute articles__btn-search"
            >
              <Search color="white" size={22} />
            </Button>
          </Form>
        </div>

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
        {total > 0 && !loading && (
          <div>
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
                      <a href={article.downloadUrl} title={article.downloadUrl}>
                        {this.getUrlAlias(article.downloadUrl)}
                      </a>
                    </td>
                    <td>
                      {!favorites.includes(article.id) ? (
                        <button
                          className="btn favorite"
                          title="Adicionar aos favoritos"
                          onClick={() => this.addFavorite(article.id)}
                        >
                          <Star color="#0069d9" size={24} />
                        </button>
                      ) : (
                        <button
                          className="btn favorite--filled"
                          title="Remover dos favoritos"
                          onClick={() => this.removeFavorite(article.id)}
                        >
                          <StarFill
                            color="#0069d9"
                            size={24}
                            className="favorite"
                          />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex align-content-center justify-content-center">
              <Pagination
                currentPage={this.getPage()}
                totalRecords={total}
                onPageChanged={(page: number) => this.onPageChanged(page)}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  setTerms = (event: React.FormEvent) => {
    event.preventDefault()
    this.updateUri({
      page: this.getPage(),
      searchTerms: this.state.searchTerms
    })
    this.search()
  }

  getPage = () => {
    const query = this.getQuery()
    return query.page ? parseInt(query.page.toString()) : 1
  }

  search = () => {
    const { fetchArticles } = this.props
    fetchArticles({
      query: this.state.searchTerms,
      page: this.getPage()
    })
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerms: event.target.value })
  }

  getUrlAlias = (url: string) => {
    const split = url.split('/')
    return split[split.length - 1]
  }

  getQuery = () => {
    return queryString.parse(this.props.history.location.search)
  }

  addFavorite = (id: string) => {
    const { addFavorite } = this.props
    addFavorite(id)
  }

  removeFavorite = (id: string) => {
    const { removeFavorite } = this.props
    removeFavorite(id)
  }

  onPageChanged = (page: number) => {
    this.updateUri({ page: page, searchTerms: this.state.searchTerms })
    this.search()
  }

  updateUri = ({ page, searchTerms }: QueryUri) => {
    this.props.history.push({
      pathname: '/',
      search: `?terms=${searchTerms}&page=${page}`
    })
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  articles: state.articles.data,
  total: state.articles.total,
  loading: state.articles.loading,
  favorites: state.favorites
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ ...ArticlesActions, ...FavoritesActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
