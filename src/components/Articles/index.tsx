import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, Action } from 'redux'
import { ApplicationState } from './../../store/index'
import {
  Article,
  FetchArticlesPayload,
  QueryUri
} from '../../store/ducks/articles/types'
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
  [key: string]: string | number | (number | undefined)
  terms: string
  page: number
  startYear?: number
  finishYear?: number
}

type Props = StateProps & DispathProps

class Articles extends Component<Props, LocalState> {
  constructor(props: Props) {
    super(props)
    const query = this.getQuery()
    const initState: LocalState = {
      terms: query.terms ? query.terms.toString() : '',
      page: this.getPage()
    }

    if (query.startYear) initState.startYear = this.queryToInt(query.startYear)
    if (query.finishYear)
      initState.finishYear = this.queryToInt(query.finishYear)

    this.state = initState
  }

  componentDidMount() {
    const { fetchFavorites } = this.props
    const { terms, startYear, finishYear } = this.state
    fetchFavorites()
    if (terms.length || startYear || finishYear) this.search()
  }

  render() {
    const { articles, total, loading, favorites } = this.props

    return (
      <div className="articles">
        <div className="articles__header">
          <Form onSubmit={this.apply} className="articles__form">
            <div className="d-flex align-items-center">
              <div className="position-relative terms-wrapper">
                <Form.Label>Pesquisar artigos</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Palavra(s) chave"
                  value={this.state.terms}
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
              </div>
              <div className="ml-5">
                <Form.Label>De</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  name="startYear"
                  value={this.state.startYear}
                  onChange={this.yearSelected.bind(this)}
                >
                  <option></option>
                  {this.buildYears().map((year: number) => {
                    return (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    )
                  })}
                </Form.Control>
                <Form.Text className="text-muted">À partir do ano</Form.Text>
              </div>
              <div className="ml-3">
                <Form.Label>Até</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  name="finishYear"
                  value={this.state.finishYear}
                  onChange={this.yearSelected.bind(this)}
                >
                  <option></option>
                  {this.buildYears().map((year: number) => {
                    return (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    )
                  })}
                </Form.Control>
                <Form.Text className="text-muted">Até o ano</Form.Text>
              </div>
              <Button variant="primary" type="submit" className="ml-3 mt-2">
                Aplicar
              </Button>
            </div>
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
          <>
            <div className="mb-3 articles__found">
              <strong>{total.toLocaleString()}</strong> artigo(s) encontrado(s):
            </div>
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
          </>
        )}
      </div>
    )
  }

  apply = (event: React.FormEvent) => {
    event.preventDefault()
    this.updateUri()
    this.search()
  }

  getPage = () => {
    const query = this.getQuery()
    return query.page ? parseInt(query.page.toString()) : 1
  }

  search = () => {
    const { fetchArticles } = this.props
    const { terms, startYear, finishYear } = this.state
    let query = terms
    if (startYear) query += ' AND year:>=' + startYear
    if (finishYear) query += ' AND year:<=' + finishYear
    fetchArticles({
      query: query,
      page: this.getPage()
    })
  }

  queryToInt = (queryString: string | string[]) => {
    return parseInt(queryString.toString())
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ terms: event.target.value })
  }

  getUrlAlias = (url: string) => {
    const split = url.split('/')
    return split[split.length - 1]
  }

  getQuery = () => {
    return queryString.parse(this.props.history.location.search)
  }

  buildYears = () => {
    let years = []
    const currentYear = new Date().getFullYear()
    for (let i = currentYear; i >= 1950; i--) years.push(i)
    return years
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
    this.setState({ page: page })
  }

  buildQuery = (): string => {
    const query: QueryUri = {}
    const { terms, startYear, finishYear, page } = this.state
    if (terms) query.terms = terms
    if (page) query.page = page
    if (startYear) query.startYear = startYear
    if (finishYear) query.finishYear = finishYear
    return queryString.stringify(query)
  }

  updateUri = () => {
    this.props.history.push({
      pathname: '/',
      search: this.buildQuery()
    })
  }

  yearSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value)
    const key = event.target.name
    this.setState({ [key]: year ? year : undefined })
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
