import React from 'react'
import PropTypes from 'prop-types'
import { computed, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Table, Icon, Popconfirm, Modal } from 'antd'
import DateFormatter from '../utils/DateFormatter'
import ArticleSearchForm from '../components/article/ArticleSearchForm'
import '../style/Page.css'

@inject('articleListStore', 'categoryStore')
@observer
class ArticleListPage extends React.Component {
  handleTableChange = (pagination, filters, sorter) => {
    this.props.articleListStore.loadArticles({
      current: pagination.current,
      ...filters
    })
  }
  handleFormSearch = article => {
    this.props.articleListStore.filterArticle(article)
    this.props.articleListStore.loadArticles(article)
  }
  columns = [
    {
      title: 'Subject',
      dataIndex: 'data',
      key: 'id',
      width: '25%',
      className: 'cellStyle',
      render: (text, record) => {
        let data = JSON.parse(text)
        return data.subject
      }
    },
    {
      title: 'Tags',
      dataIndex: 'data',
      key: 'tags',
      width: '10%',
      className: 'cellStyle',
      render: (text, record) => {
        let data = JSON.parse(text)
        return data.tags
      }
    },
    {
      title: 'Category',
      dataIndex: 'code',
      key: 'code',
      className: 'cellStyle',
      width: '10%'
    },
    {
      title: 'Url',
      dataIndex: 'aliyunUrl',
      key: 'aliyunUrl',
      className: 'cellStyle',
      width: '25%'
    },
    {
      title: 'Create Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: '10%',
      className: 'cellStyle',
      render: (text, record) => (
        <div>{DateFormatter.format(new Date(text))}</div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      className: 'cellStyle',
      render: (text, record) => {
        let data = JSON.parse(record.data)
        let showInfoModal = () =>
          Modal.info({
            title: data.subject,
            content: data.content
          })
        return (
          <span>
            <Popconfirm
              placement="top"
              title={'Do you want to delete this record?'}
              onConfirm={() =>
                this.props.articleListStore.deleteArticle(record.id)
              }
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" />
            </Popconfirm>

            <Icon
              style={{ paddingLeft: 20 }}
              type="eye"
              onClick={showInfoModal}
            />
          </span>
        )
      }
    }
  ]
  componentWillMount() {
    this.props.articleListStore.loadArticles({})
    this.props.categoryStore.loadCategories()
  }
  @computed
  get articles() {
    return this.props.articleListStore.articles
  }
  @computed
  get articleForm() {
    return this.props.articleListStore.articleForm
  }
  @computed
  get categories() {
    let categories = this.props.categoryStore.categories
    return categories ? categories.slice() : []
  }

  render() {
    // let { articles, articleForm } = this.props.articleListStore
    let pagination = {
      total: this.articles.total,
      page: this.articleForm.current,
      pageSize: 5
    }
    // let categories = this.props.categoryStore.categories.slice()
    return (
      <div>
        <ArticleSearchForm
          handleFormSearch={this.handleFormSearch}
          categories={this.categories}
        />
        <Table
          rowKey="id"
          pagination={pagination}
          dataSource={toJS(this.articles.data)}
          columns={this.columns}
          onChange={this.handleTableChange}
        />
      </div>
    )
  }
}
ArticleListPage.propTypes = {
  articleListStore: PropTypes.object,
  categoryStore: PropTypes.object
}
export default ArticleListPage
