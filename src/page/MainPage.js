import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { inject, observer } from 'mobx-react'
import Menus from './Menus'
import 'antd/dist/antd.css'
import MenuMapping from '../consts/MenuMapping'
const { Footer, Sider } = Layout

@inject('appStore', 'rootStore')
@observer
class MainPage extends React.Component {
  componentWillMount() {
    this.props.appStore.loadApp()
  }

  render() {
    const {
      rootStore: { routerStore }
    } = this.props
    const {
      routerState: { params }
    } = routerStore
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsed>
          <div className="logo" />
          <Menus />
        </Sider>
        <Layout>
          {MenuMapping.loadPage(params.page)}
          <Footer style={{ textAlign: 'center' }}>
            {this.props.appStore.app.appName}:{this.props.appStore.app.ver}
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
MainPage.propTypes = {
  appStore: PropTypes.object,
  rootStore: PropTypes.object
}
export default MainPage
