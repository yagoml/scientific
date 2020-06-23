import React, { Component } from 'react'
import Core from '../../../services/core'
import axios from 'axios'
import { withRouter, RouteComponentProps } from 'react-router'
import { Article } from '../../../store/ducks/articles/types'
import Loader from '../../../components/Loader'
import './style.scss'

interface RouteParam {
  id: string
}

interface LocalState {
  loading: boolean
  article?: Article
}

type Props = RouteComponentProps<RouteParam>

class Details extends Component<Props, LocalState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.getArticleDetail()
  }

  render() {
    const { loading, article } = this.state
    return (
      <div className="article-details">
        {loading && <Loader />}
        {article && (
          <div>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            {article.topics && article.topics.length > 0 && (
              <div className="d-flex align-items-center mb-3">
                <span className="mr-2">Tópicos:</span>
                {article.topics?.map((topic, index) => (
                  <span className="article-details__topic" key={index}>
                    {topic}
                  </span>
                ))}
              </div>
            )}
            {article.authors.length > 0 && (
              <p>
                <span>Autores:</span>{' '}
                <strong>{article.authors.map(a => a)}</strong>
              </p>
            )}
            {article.publisher && (
              <p>
                <span>Editora:</span> <strong>{article.publisher}</strong>
              </p>
            )}
            <p>
              <span>Ano:</span> <strong>{article.year}</strong>
            </p>
            <p>
              <span>Publicado em:</span>{' '}
              <strong>{this.getDate()?.toLocaleDateString()}</strong>
            </p>
            {article.language !== undefined && (
              <p>
                <span>Idioma:</span> <strong>{article.language?.name}</strong>
              </p>
            )}
            <p>
              <a
                href={article.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Acessar documento
              </a>
            </p>
          </div>
        )}
      </div>
    )
  }

  getArticleDetail = () => {
    this.setState({ loading: true })
    const articleID = this.props.match.params.id
    const config = Core.requestConfig({
      path: 'get/' + articleID,
      method: 'get'
    })
    axios(config)
      .then(response => {
        const { data } = response.data
        this.setState({ loading: false, article: data })
      })
      .catch(error => {
        throw error
      })
  }

  getDate = () => {
    const { article } = this.state
    if (!article || !article.datePublished) return
    const dateStr: Date = article.datePublished
    const date = new Date(dateStr)
    return date
  }
}

export default withRouter(Details)
