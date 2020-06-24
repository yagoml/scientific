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
import { Trash } from 'react-bootstrap-icons'
import TableHead from '../../articles/TableHead'
import { getQueryPage } from '../../../helpers/uri-query'

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
  fetchFavorites(page: number, silent?: boolean): void
}

type Props = StateProps & DispatchProps

class DataTable extends Component<Props, OwnState> {
  private perPage: number = 7

  constructor(props: Props) {
    super(props)
    let page = getQueryPage()
    this.state = { page: page }
  }

  componentDidMount() {
    const { fetchFavorites } = this.props
    // Fetch favorite articles list
    fetchFavorites(this.state.page)
  }

  render() {
    const { articles, loading, total } = this.props

    return (
      <div className="favorites-table">
        {loading && <Loader />}
        {total > 0 && !loading && (
          <>
            <Table hover>
              <TableHead />
              <tbody>
                {articles.map((article: Article) => (
                  <tr
                    key={article.id}
                    title="Clique para ver detalhes"
                    onClick={() => this.articleDetails(article.id)}
                  >
                    <td>{article.authors}</td>
                    <td>{article.types}</td>
                    <td>{article.title}</td>
                    <td>
                      <div className="table-description-wrapper">
                        {article.description}
                      </div>
                    </td>
                    <td>
                      <a
                        href={article.downloadUrl}
                        title={article.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                      >
                        Visualizar
                      </a>
                    </td>
                    <td>
                      <button
                        className="btn favorite--filled"
                        title="Remover dos favoritos"
                        onClick={e => this.removeFavorite(article.id, e)}
                      >
                        <Trash color="#9a00f1" size={24} />
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
        {total === 0 && !loading && (
          <div className="px30">Nenhum artigo favorito ainda.</div>
        )}
      </div>
    )
  }

  /**
   * Remove article from favorites
   * @param id Article ID
   * @param e Click event
   */
  removeFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const { removeFavorite, articles } = this.props
    const article = articles.find(a => a.id === id)
    const remove = window.confirm(`Remover "${article?.title}" dos favoritos?`)
    if (!remove) return
    removeFavorite(id)
    this.checkPage()
  }

  /**
   * Check page on favorite exclusion.
   */
  checkPage = () => {
    const { fetchFavorites, articles } = this.props
    let page = this.state.page
    if (articles.length === 1 && page > 1) return this.togglePage()
    fetchFavorites(page, true)
  }

  /**
   * Build pagination items
   */
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

  /**
   * Set new page
   * @param page Page
   */
  setPage = async (page: number) => {
    if (page === this.state.page) return
    await this.setState({ page: page })
    const { fetchFavorites } = this.props
    fetchFavorites(this.state.page)
    this.updateUri()
  }

  /**
   * Toggle to next/prev page
   * @param next Go next? Otherwise go to prev
   */
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

  /**
   * Update page uri
   */
  updateUri = () => {
    history.push({
      pathname: '/favorites',
      search: queryString.stringify(this.state)
    })
  }

  /**
   * Go to article details
   * @param id Article ID
   */
  articleDetails = (id: string) => {
    history.push({
      pathname: '/details/' + id
    })
  }

  /**
   * Pagination builder
   */
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

  /**
   * Calculate total of pages
   */
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
