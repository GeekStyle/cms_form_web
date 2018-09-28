import React from 'react'
import { inject } from 'mobx-react'
import { RouterView } from 'mobx-state-router'
import MainPage from './page/MainPage'
import PublishPage from './page/PublishPage'
import ArticleListPage from './page/ArticleListPage'
import PropTypes from 'prop-types'
// import { NotFoundPage } from './features/not-found-page';

const viewMap = {
  mainpage: <MainPage />,
  publish: <PublishPage />,
  listpage: <ArticleListPage />
}
//,
// notFound: <NotFoundPage />
class ShellBase extends React.Component {
  render() {
    const {
      rootStore: { routerStore }
    } = this.props
    if (this.props.page) {
      routerStore.goTo(this.props.page, this.props.params)
    }
    
    return (
      <div style={{ width: '100%' }}>
        <RouterView routerStore={routerStore} viewMap={viewMap} />
      </div>
    )
  }
}
ShellBase.propTypes = {
  rootStore: PropTypes.object
}
export const Shell = inject('rootStore')(ShellBase)
