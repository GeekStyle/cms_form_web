import { observable, action } from 'mobx'
import axios from 'axios'
import MessageModal from '../components/MessageModal'
import { GetUrl } from '../consts/Env'

class AppStore {
  @observable
  app = {}
  @observable
  loadingApp

  @action
  loadApp() {
    this.loadingApp = true
    return axios
      .get(GetUrl('/app'))
      .then(
        action(res => {
          this.app = res.data
        })
      )
      .catch(function(error) {
        MessageModal('error', 'Failed', error.response.data)
      })
  }
}

export default new AppStore()
