import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Search } from 'react-bootstrap-icons'
import { ArticlesFilters } from '../../../store/ducks/articles/types'
import { Dispatch, bindActionCreators } from 'redux'
import { ApplicationState } from '../../../store/index'
import * as ArticlesActions from '../../../store/ducks/articles/actions'
import { connect } from 'react-redux'
import './style.scss'
import history from '../../../history'
import * as UriQuery from '../../../helpers/uri-query'

interface StateProps {
  filters: ArticlesFilters
  total: number
}

interface OwnProps {
  apply: Function
}

interface DispathProps {
  setFilters(filters: ArticlesFilters): void
  cleanFilters(): void
}

type Props = StateProps & DispathProps & OwnProps

export class Filters extends Component<Props, ArticlesFilters> {
  private years: number[]

  constructor(props: Props) {
    super(props)
    const query = UriQuery.getQuery()
    const initState: ArticlesFilters = {
      terms: query.terms ? query.terms.toString() : '',
      page: UriQuery.getQueryPage()
    }
    this.years = this.buildYears()

    if (query.startYear)
      initState.startYear = UriQuery.queryToInt(query.startYear)
    if (query.finishYear)
      initState.finishYear = UriQuery.queryToInt(query.finishYear)

    this.state = initState
  }

  render() {
    return (
      <Form onSubmit={this.applyFilters} className="articles-form">
        <div className="d-flex align-items-center">
          <div className="position-relative articles-form__terms-wrapper">
            <Form.Label>Pesquisar artigos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Palavra(s) chave"
              value={this.state.terms}
              onChange={this.handleTerms}
              style={{ padding: '6px 55px 6px 12px' }}
            />
            <Form.Text className="text-muted">
              Pesquise por <strong>título, descrição</strong> ou{' '}
              <strong>autores</strong>
            </Form.Text>
            <Button
              variant="primary"
              type="submit"
              className="mt-3 position-absolute articles-form__btn-search"
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
              {this.years.map((year: number) => {
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
              {this.years.map((year: number) => {
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
          {this.hasFilter() && (
            <Button
              variant="secondary"
              type="reset"
              className="ml-3 mt-2"
              onClick={() => this.resetFilters()}
            >
              Limpar filtros
            </Button>
          )}
        </div>
      </Form>
    )
  }

  /**
   * Handle terms change
   * @param event Change event
   */
  handleTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ terms: event.target.value })
  }

  /**
   * Apply current filters
   * @param event Form event
   */
  applyFilters = async (event?: React.FormEvent) => {
    if (event) event.preventDefault()
    const valid = this.checkYears()
    if (!valid) return alert('Ano final não pode ser maior que o inicial')
    await this.props.setFilters(this.state)
    this.props.apply()
  }

  /**
   * Start and finish years validation.
   */
  checkYears() {
    const { startYear, finishYear } = this.state
    if (!startYear || !finishYear) return true
    return finishYear >= startYear
  }

  /**
   * Year select handler
   * @param event Change event
   */
  yearSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value)
    const key = event.target.name
    this.setState({ [key]: year ? year : undefined })
  }

  /**
   * Build selects years
   */
  buildYears = () => {
    let years = []
    const currentYear = new Date().getFullYear()
    for (let i = currentYear; i >= 1800; i--) years.push(i)
    return years
  }

  /**
   * Check if has filters applied
   */
  hasFilter = (): boolean => {
    const { terms, startYear, finishYear } = this.state
    const hasTerms = terms !== undefined && terms.length > 0
    const hasStartYear = startYear !== undefined && startYear > 0
    const hasFinishYear = finishYear !== undefined && finishYear > 0
    return hasTerms || hasStartYear || hasFinishYear
  }

  /**
   * Reset filters
   */
  resetFilters = () => {
    const { cleanFilters } = this.props
    this.setState({
      terms: '',
      page: 1,
      startYear: 0,
      finishYear: 0
    })
    cleanFilters()
    history.push({
      pathname: '/'
    })
  }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
  filters: state.articles.filters,
  total: state.articles.total
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ArticlesActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
