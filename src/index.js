import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import appStore from './stores/appStore'
import categoryStore from './stores/categoryStore'
import articleStore from './stores/articleStore'
import articleListStore from './stores/articleListStore'
import { HistoryAdapter } from 'mobx-state-router'
import { RootStore } from './shared/utils/RootStore'
import { history } from './shared/utils/history'
import { Shell } from './shell'
import LibUtil from './utils/LibUtil'
import './index.css'

configure({ isolatedGlobalState: true })

const rootStore = new RootStore()
const stores = {
  appStore,
  categoryStore,
  articleStore,
  articleListStore,
  rootStore
}
// Observe history changes
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history)
historyAdapter.observeRouterStateChanges()

class CMSAPP extends React.Component {
  render() {
    if(this.props.hasText){
      LibUtil.hasText = this.props.hasText
    }
    return (
      <Provider {...stores}>
        <Shell {...this.props}/>
      </Provider>
    )
  }
}
CMSAPP.propTypes = {
  hasText: PropTypes.any
}
export default CMSAPP
