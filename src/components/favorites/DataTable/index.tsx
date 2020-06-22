import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import { Article } from '../../../store/ducks/articles/types'
import { ApplicationState } from '../../../store/index'
import { bindActionCreators, Dispatch } from 'redux'
import * as FavoritesActions from '../../../store/ducks/favorites/actions'
import { connect } from 'react-redux'
import Loader from '../../Loader'
import history from '../../../history'
import queryString from 'query-string'

interface StateProps {
  articles: Article[]
  total: number
  loading: boolean
}

interface OwnState {
  page: number
}

interface DispatchProps {
  removeFavorite(id: string): void
  fetchFavorites(page: number): void
}

type Props = StateProps & DispatchProps

class DataTable extends Component<Props, OwnState> {
  private perPage: number = 4

  constructor(props: Props) {
    super(props)
    let page = this.getQueryPage()
    this.state = { page: page }
  }

  componentDidMount() {
    const { fetchFavorites } = this.props
    fetchFavorites(this.state.page)
  }

  render() {
    const { articles, loading, total } = this.props

    return (
      <div className="favorites-table">
        {loading && <Loader />}
        {total > 0 && !loading && (
          <>
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
                {articles.map((article: Article) => (
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
                      <button
                        className="btn favorite--filled"
                        title="Remover dos favoritos"
                        onClick={() => this.removeFavorite(article.id)}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex align-content-center justify-content-center">
              {this.pagination()}
            </div>
          </>
        )}
      </div>
    )
  }

  getUrlAlias = (url: string) => {
    const split = url.split('/')
    return split[split.length - 1]
  }

  removeFavorite = (id: string) => {
    const { removeFavorite } = this.props
    removeFavorite(id)
  }

  getQueryPage = () => {
    const query = queryString.parse(window.location.search)
    let page = 1
    if (query.page) {
      page = parseInt(query.page.toString())
      if (!page) page = 1
    }
    return page
  }

  paginationItems = () => {
    let items = []
    const { page } = this.state
    const pages = this.getTotalPages()
    for (let number = 1; number <= pages; number++)
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => this.setPage(number)}
        >
          {number}
        </Pagination.Item>
      )
    return items
  }

  setPage = async (page: number) => {
    if (page === this.state.page) return
    await this.setState({ page: page })
    const { fetchFavorites } = this.props
    fetchFavorites(this.state.page)
    this.updateUri()
  }

  togglePage = (next?: boolean) => {
    const total = this.getTotalPages()
    if (next) {
      const nextPage = this.state.page + 1
      if (nextPage <= total) this.setPage(nextPage)
    } else {
      const prevPage = this.state.page - 1
      if (prevPage >= 1) this.setPage(prevPage)
    }
  }

  updateUri = () => {
    history.push({
      pathname: '/favorites',
      search: queryString.stringify(this.state)
    })
  }

  pagination = () => {
    const totalPages = this.getTotalPages()
    return (
      <Pagination>
        <Pagination.First
          disabled={this.state.page === 1}
          onClick={() => this.setPage(1)}
        />
        <Pagination.Prev
          disabled={this.state.page === 1}
          onClick={() => this.togglePage()}
        />
        {this.paginationItems()}
        <Pagination.Next
          disabled={this.state.page === totalPages}
          onClick={() => this.togglePage(true)}
        />
        <Pagination.Last
          disabled={this.state.page === totalPages}
          onClick={() => this.setPage(totalPages)}
        />
      </Pagination>
    )
  }

  getTotalPages = () => {
    return Math.ceil(this.props.total / this.perPage)
  }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
  articles: state.favorites.articles,
  total: state.favorites.total,
  loading: state.favorites.loading
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(FavoritesActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)
