import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import { Article } from '../../../store/ducks/articles/types'
import { ApplicationState } from '../../../store/index'
import { bindActionCreators, Dispatch } from 'redux'
import * as FavoritesActions from '../../../store/ducks/favorites/actions'
import { connect } from 'react-redux'
import Loader from '../../Loader'

interface StateProps {
  articles: Article[]
  total: number
  loading: boolean
}

interface DispatchProps {
  removeFavorite(id: string): void
  fetchFavorites(): void
}

type Props = StateProps & DispatchProps

class DataTable extends Component<Props> {
  componentDidMount() {
    const { fetchFavorites } = this.props
    fetchFavorites()
  }

  render() {
    const { articles, loading, total } = this.props

    return (
      <div className="favorites-table">
        {loading && <Loader />}
        {total > 0 && !loading && (
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
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
  articles: state.favorites.articles,
  total: state.favorites.total,
  loading: state.favorites.loading
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(FavoritesActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)
