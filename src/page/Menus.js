import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import { action } from 'mobx'

@inject('appStore', 'rootStore')
@observer
class Menus extends React.Component {
  @action
  handleGoto = section => {
    const {
      rootStore: { routerStore }
    } = this.props
    routerStore.goTo('mainpage', { page: section })
  }
  render() {
    return (
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item onClick={() => this.handleGoto('publish')} key="1">
          <Icon type="file-markdown" />
          <span>Publish</span>
        </Menu.Item>
        <Menu.Item onClick={() => this.handleGoto('articles')} key="2">
          <Icon type="folder" />
          <span>Articles</span>
        </Menu.Item>
        {/* <Menu.Item onClick={() => this.handleGoto('category')} key="3">
          <Icon type="setting" />
          <span>Category</span>
        </Menu.Item> */}
      </Menu>
    )
  }
}
Menus.propTypes = {
  rootStore: PropTypes.object
}
export default Menus
