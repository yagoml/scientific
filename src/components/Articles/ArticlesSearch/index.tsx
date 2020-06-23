import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { ApplicationState } from '../../../store/index'
import {
  FetchArticlesPayload,
  ArticlesFilters
} from '../../../store/ducks/articles/types'
import * as ArticlesActions from '../../../store/ducks/articles/actions'
import * as FavoritesActions from '../../../store/ducks/favorites/actions'
import './style.scss'
import queryString from 'query-string'
import LargePagination from '../../LargePagination'
import Filters from '../Filters'
import DataTable from '../DataTable'
import Loader from '../../Loader'
import history from '../../../history'
import { buildSearchQuery } from '../../../services/core'

interface StateProps {
  total: number
  loading: boolean
  empty: boolean
  filters: ArticlesFilters
}

interface DispatchProps {
  fetchArticles(params: FetchArticlesPayload): void
  setFilters(filters: ArticlesFilters): void
}

type Props = StateProps & DispatchProps

class Articles extends Component<Props> {
  render() {
    const { total, loading, empty } = this.props

    return (
      <div className="articles">
        <div className="articles__header">
          <Filters apply={this.apply.bind(this)} />
        </div>
        {loading && <Loader />}
        {total > 0 && !loading && (
          <>
            <div className="mb-3 articles__found">
              <strong>{total.toLocaleString()}</strong> artigo(s) encontrado(s):
            </div>
            <DataTable />
            <div className="d-flex align-content-center justify-content-center">
              <LargePagination
                currentPage={this.getPage()}
                totalRecords={total}
                onPageChanged={(page: number) => this.onPageChanged(page)}
              />
            </div>
          </>
        )}
        {empty && !loading && (
          <div className="articles__found">
            Nenhum artigo encontrado com os termos pesquisados.
          </div>
        )}
      </div>
    )
  }

  apply = () => {
    this.search()
    history.push({
      pathname: '/',
      search: queryString.stringify(this.props.filters)
    })
  }

  getPage = () => {
    const query = this.getQuery()
    return query.page ? parseInt(query.page.toString()) : 1
  }

  search = () => {
    const { fetchArticles, filters } = this.props
    let searchQuery = buildSearchQuery(filters)
    if (!searchQuery.length) return
    fetchArticles({
      query: searchQuery,
      page: this.getPage()
    })
  }

  queryToInt = (queryString: string | string[]) => {
    return parseInt(queryString.toString())
  }

  getQuery = () => {
    return queryString.parse(window.location.search)
  }

  onPageChanged = async (page: number) => {
    await this.props.setFilters({ ...this.props.filters, ...{ page: page } })
    this.apply()
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  total: state.articles.total,
  loading: state.articles.loading,
  filters: state.articles.filters,
  empty: state.articles.empty
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ ...ArticlesActions, ...FavoritesActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
