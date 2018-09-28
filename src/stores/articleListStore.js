import { observable, action } from 'mobx'
import axios from 'axios'
import MessageModal from '../components/MessageModal'
import { GetUrl } from '../consts/Env'

class ArticleListStore {
  @observable
  articles = { data: [], total: 0 }
  @observable
  filterSubjectVisible = false
  @observable
  articleForm = { subject: '', code: '', startDt: '', endDt: '', current: 1 }
  pageSize = 5

  @action
  loadArticles(options) {
    if (options && options.current) this.articleForm.current = options.current
    let query = this.getQueryString()
    return axios
      .get(GetUrl(query))
      .then(
        action(res => {
          this.articles = res.data
        })
      )
      .catch(function(error) {
        MessageModal('error', 'Failed', error.response.data.message)
      })
  }

  getQueryString() {
    let skip = this.pageSize * (this.articleForm.current - 1)
    let query = `/api/article?skip=${skip}&take=${this.pageSize}`
    if (this.articleForm.subject)
      query = query + `&subject=${this.articleForm.subject}`
    query = query + `&tags=${this.articleForm.subject}`
    if (this.articleForm.code) query = query + `&code=${this.articleForm.code}`
    if (this.articleForm.startDt)
      query = query + `&startDt=${this.articleForm.startDt}`
    if (this.articleForm.endDt)
      query = query + `&endDt=${this.articleForm.endDt}`
    return query
  }

  @action
  deleteArticle(id) {
    return axios
      .delete(`${GetUrl('/api/article/')}${id}`)
      .then(
        action(res => {
          this.articles = res.data
        })
      )
      .catch(function(error) {
        MessageModal('error', 'Failed', error.response.data.message)
      })
  }

  @action
  filterArticle(article) {
    this.articleForm.current = 1
    this.articleForm.subject = article.subject
    this.articleForm.code = article.code
    this.articleForm.startDt = article.startDt
    this.articleForm.endDt = article.endDt
  }
}

export default new ArticleListStore()
