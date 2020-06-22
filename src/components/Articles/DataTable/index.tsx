import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import { Star, StarFill } from 'react-bootstrap-icons'
import { Article } from '../../../store/ducks/articles/types'
import { ApplicationState } from '../../../store/index'
import { bindActionCreators, Dispatch } from 'redux'
import * as FavoritesActions from '../../../store/ducks/favorites/actions'
import { connect } from 'react-redux'

interface StateProps {
  articles: Article[]
  favorites: string[]
}

interface DispatchProps {
  addFavorite(id: string): void
  removeFavorite(id: string): void
  fetchFavoritesIDs(): void
}

type Props = StateProps & DispatchProps

class DataTable extends Component<Props> {
  componentDidMount() {
    const { fetchFavoritesIDs } = this.props
    fetchFavoritesIDs()
  }

  render() {
    const { articles, favorites } = this.props

    return (
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
                    <Star color="#9a00f1" size={24} />
                  </button>
                ) : (
                  <button
                    className="btn favorite--filled"
                    title="Remover dos favoritos"
                    onClick={() => this.removeFavorite(article.id)}
                  >
                    <StarFill color="#9a00f1" size={24} className="favorite" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  getUrlAlias = (url: string) => {
    const split = url.split('/')
    return split[split.length - 1]
  }

  addFavorite = (id: string) => {
    const { addFavorite } = this.props
    addFavorite(id)
  }

  removeFavorite = (id: string) => {
    const { removeFavorite } = this.props
    removeFavorite(id)
  }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
  articles: state.articles.data,
  favorites: state.favorites.ids
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(FavoritesActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)
