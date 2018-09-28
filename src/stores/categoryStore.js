import { observable, action } from 'mobx'
import axios from 'axios'
import MessageModal from '../components/MessageModal'
import { GetUrl } from '../consts/Env'
import ArticleType from '../consts/ArticleType'
const CategoryForm = {
  name: '',
  description: '',
  dataType: ArticleType.MARKDOWN
}
class CategoryStore {
  @observable
  categories = []
  @observable
  category = CategoryForm
  @observable
  errors = CategoryForm

  @action
  loadCategories() {
    return axios
      .get(GetUrl('/api/category'))
      .then(
        action(res => {
          this.categories.replace(res.data)
        })
      )
      .catch(function(error) {
        MessageModal('error', 'Failed', error.response.data.message)
      })
  }

  checkField(formJson, ...fields) {
    this.errors.hasError = false
    fields.map(field => {
      if (!formJson[field]) {
        this.errors[field] = 'Required '
        this.errors.hasError = true
      } else {
        this.errors[field] = ''
      }
      if (field === 'name' && formJson[field].length > 20) {
        this.errors[field] = 'Name cannot be more than 20 characters. '
        this.errors.hasError = true
      }
    })
    this.errors.definition = ''
    if (formJson.dataType === ArticleType.JSON) {
      if (!formJson.definition) {
        this.errors.definition = 'Required '
        this.errors.hasError = true
      } else {
        try {
          JSON.parse(formJson.definition)
        } catch (e) {
          this.errors.definition = 'Invalid Json Format '
          this.errors.hasError = true
        }
      }
    }
  }

  @action
  createCategory(cate) {
    this.checkField(cate, 'name', 'description')
    if (this.errors.hasError) return
    return axios
      .post(GetUrl('/api/category'), cate)
      .then(
        action(res => {
          MessageModal('success', 'Success', 'Category create success.')
          this.categories.replace(res.data)
          this.errors = CategoryForm
        })
      )
      .catch(function(error) {
        MessageModal('error', 'Failed', error.response.data.message)
      })
  }

  @action
  updateFormValue(field, value) {
    this.category[field] = value
  }

  @action
  deleteCategory(id) {
    return axios
      .delete(`${GetUrl('/api/category/')}${id}`)
      .then(
        action(res => {
          this.categories.replace(res.data)
        })
      )
      .catch(function(error) {
        MessageModal('error', 'Failed', error.response.data.message)
      })
  }
}

export default new CategoryStore()
