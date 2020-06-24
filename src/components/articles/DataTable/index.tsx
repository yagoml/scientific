import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import { Star, StarFill } from 'react-bootstrap-icons'
import { Article } from '../../../store/ducks/articles/types'
import { ApplicationState } from '../../../store/index'
import { bindActionCreators, Dispatch } from 'redux'
import * as FavoritesActions from '../../../store/ducks/favorites/actions'
import { connect } from 'react-redux'
import history from '../../../history'
import './style.scss'
import TableHead from '../TableHead'

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
    // Get favorite items IDs
    fetchFavoritesIDs()
  }

  render() {
    const { articles, favorites } = this.props

    return (
      <Table hover className="articles-data">
        <TableHead />
        <tbody>
          {articles.map(article => (
            <tr
              key={article.id}
              title="Clique para ver detalhes"
              onClick={event => this.articleDetails(article.id)}
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
                {!favorites.includes(article.id) ? (
                  <button
                    className="btn favorite"
                    title="Adicionar aos favoritos"
                    onClick={e => this.addFavorite(article.id, e)}
                  >
                    <Star color="#9a00f1" size={24} />
                  </button>
                ) : (
                  <button
                    className="btn favorite--filled"
                    title="Remover dos favoritos"
                    onClick={e => this.removeFavorite(article.id, e)}
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

  /**
   * Save article as favorite
   * @param id Article ID
   * @param e Click event
   */
  addFavorite = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    const { addFavorite } = this.props
    addFavorite(id)
  }

  /**
   * Remove article from favorites
   * @param id Article ID
   * @param e Click event
   */
  removeFavorite = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    const { removeFavorite } = this.props
    removeFavorite(id)
  }

  /**
   * Go to article details page
   * @param id Article ID
   */
  articleDetails = (id: string) => {
    history.push({
      pathname: '/details/' + id
    })
  }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
  articles: state.articles.data,
  favorites: state.favorites.ids
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(FavoritesActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)
