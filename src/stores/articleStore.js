import { observable, action } from 'mobx'
import axios from 'axios'
import MessageModal from '../components/MessageModal'
import { AliFileUploader } from 'bmo-ossCli'
import { GetUrl } from '../consts/Env'

const uuidv1 = require('uuid/v1')
const ArticleForm = { subject: '', code: '', tags: '', content: '' }
class ArticleStore {
  @observable
  article = ArticleForm
  @observable
  code = ''
  @observable
  errors = ArticleForm
  @observable
  jsonArray = []
  @observable
  jsonObject = {}
  @observable
  fileList = []

  // @action
  // addJson(arr) {
  //   this.jsonArray.push(arr)
  // }
  // @action
  // removeJson(rmObjs) {
  //   rmObjs.forEach(obj => {
  //     this.jsonArray.splice(obj, 1)
  //   })
  // }
  // @action
  // updateJson(uptObj, index) {
  //   this.jsonArray[index] = uptObj
  // }
  // @action
  // updateJsonObj(uptObj) {
  //   this.jsonObject = uptObj
  // }
  @action
  changeSelCategory(code) {
    this.code = code
  }
  @action
  handleFieldChange(field, value) {
    this.article[field] = value
  }
  @action
  createArticle(article, callback) {
    article.content = this.article.content
    let errors = this.checkField(article, Object.keys(ArticleForm))
    this.errors = errors
    if (this.errors.hasError) return
    return axios
      .post(GetUrl('/api/article'), article)
      .then(
        action(res => {
          callback()
          MessageModal(
            'success',
            'Published Successfully',
            'You have published the article successfully, you can find it in search page, this modal will be destroyed after 3 seconds.'
          )
        })
      )
      .catch(function(error) {
        MessageModal('error', 'Failed', error.response.data.message)
      })
  }

  checkField(formJson, fields) {
    let errors = {}
    fields.map(field => {
      if (!formJson[field]) {
        errors[field] = 'Required '
        errors.hasError = true
      } else {
        errors[field] = ''
      }
      if (
        field === 'subject' &&
        formJson[field] &&
        formJson[field].length > 50
      ) {
        errors[field] = 'Subject cannot be more than 50 characters. '
        errors.hasError = true
      }
    })
    return errors
  }

  @action
  uploadFile(file) {
    let reader = new window.FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      var extension = file.name
        .split('.')
        .pop()
        .toLowerCase()
      let fileList = this.fileList
      let filename = uuidv1() + '.' + extension
      AliFileUploader.call(filename, file, 'cms').then(function(data) {
        fileList.push(data)
      })
    }
  }
}

export default new ArticleStore()
