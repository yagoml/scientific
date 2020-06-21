import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Search } from 'react-bootstrap-icons'
import queryString from 'query-string'
import { ArticlesFilters } from '../../../store/ducks/articles/types'
import { Action, Dispatch, bindActionCreators } from 'redux'
import { ApplicationState } from '../../../store/index'
import * as ArticlesActions from '../../../store/ducks/articles/actions'
import { connect } from 'react-redux'

interface LocalProps {
  apply: Function
}

interface DispathProps {
  setFilters(filters: ArticlesFilters): Action
}

type Props = LocalProps & DispathProps

class Filters extends Component<Props, ArticlesFilters> {
  constructor(props: Props) {
    super(props)
    const query = this.getQuery()
    const initState: ArticlesFilters = {
      terms: query.terms ? query.terms.toString() : '',
      page: this.getPage()
    }

    if (query.startYear) initState.startYear = this.queryToInt(query.startYear)
    if (query.finishYear)
      initState.finishYear = this.queryToInt(query.finishYear)

    this.state = initState
  }

  componentDidMount() {
    const { terms, startYear, finishYear } = this.state
    if ((terms && terms.length) || startYear || finishYear) this.applyFilters()
  }

  render() {
    return (
      <Form onSubmit={this.applyFilters} className="articles__form">
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
    )
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ terms: event.target.value })
  }

  applyFilters = async (event?: React.FormEvent) => {
    if (event) event.preventDefault()
    await this.props.setFilters(this.state)
    this.props.apply()
  }

  yearSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value)
    const key = event.target.name
    this.setState({ [key]: year ? year : undefined })
  }

  buildYears = () => {
    let years = []
    const currentYear = new Date().getFullYear()
    for (let i = currentYear; i >= 1950; i--) years.push(i)
    return years
  }

  queryToInt = (queryString: string | string[]) => {
    return parseInt(queryString.toString())
  }

  getPage = () => {
    const query = this.getQuery()
    return query.page ? parseInt(query.page.toString()) : 1
  }

  getQuery = () => {
    return queryString.parse(window.location.search)
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  filters: state.articles.filters
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ ...ArticlesActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
