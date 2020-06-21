import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, Action } from 'redux'
import { ApplicationState } from '../../../store/index'
import {
  Article,
  FetchArticlesPayload,
  ArticlesFilters
} from '../../../store/ducks/articles/types'
import * as ArticlesActions from '../../../store/ducks/articles/actions'
import * as FavoritesActions from '../../../store/ducks/favorites/actions'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import { Star, StarFill } from 'react-bootstrap-icons'
import './style.scss'
import queryString from 'query-string'
import Pagination from '../../Pagination'
import Filters from './../Filters'
import { History, LocationState } from 'history'

interface StateProps {
  articles: Article[]
  total: number
  loading: boolean
  favorites: string[]
  filters: ArticlesFilters
  history: History<LocationState>
}

interface DispathProps {
  fetchArticles(params: FetchArticlesPayload): Action
  addFavorite(id: string): Action
  removeFavorite(id: string): Action
  fetchFavorites(): Action
  setFilters(filters: ArticlesFilters): Action
}

type Props = StateProps & DispathProps

class Articles extends Component<Props> {
  searchFilters: React.RefObject<typeof Filters>

  constructor(props: Props) {
    super(props)
    this.searchFilters = React.createRef()
  }

  componentDidMount() {
    const { fetchFavorites } = this.props
    fetchFavorites()
  }

  render() {
    const { articles, total, loading, favorites } = this.props

    return (
      <div className="articles">
        <div className="articles__header">
          <Filters apply={this.apply.bind(this)} />
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

  apply = () => {
    this.updateUri()
    this.search()
  }

  getPage = () => {
    const query = this.getQuery()
    return query.page ? parseInt(query.page.toString()) : 1
  }

  search = () => {
    const { fetchArticles } = this.props
    const { terms, startYear, finishYear } = this.props.filters
    let query = terms
    if (startYear) query += ' AND year:>=' + startYear
    if (finishYear) query += ' AND year:<=' + finishYear
    if (!query) return
    fetchArticles({
      query: query,
      page: this.getPage()
    })
  }

  queryToInt = (queryString: string | string[]) => {
    return parseInt(queryString.toString())
  }

  getUrlAlias = (url: string) => {
    const split = url.split('/')
    return split[split.length - 1]
  }

  getQuery = () => {
    return queryString.parse(window.location.search)
  }

  addFavorite = (id: string) => {
    const { addFavorite } = this.props
    addFavorite(id)
  }

  removeFavorite = (id: string) => {
    const { removeFavorite } = this.props
    removeFavorite(id)
  }

  onPageChanged = async (page: number) => {
    await this.props.setFilters({ ...this.props.filters, ...{ page: page } })
    this.apply()
  }

  buildQuery = (): string => {
    return queryString.stringify(this.props.filters)
  }

  updateUri = () => {
    this.props.history.push({
      pathname: '/',
      search: this.buildQuery()
    })
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  articles: state.articles.data,
  total: state.articles.total,
  loading: state.articles.loading,
  favorites: state.favorites,
  filters: state.articles.filters
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ ...ArticlesActions, ...FavoritesActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
