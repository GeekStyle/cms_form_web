import React from 'react'
import PropTypes from 'prop-types'
import { computed, toJS } from 'mobx'
import { Table, Row, Popconfirm, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import { CategoryForm } from '../components'
import '../style/Page.css'

@inject('categoryStore')
@observer
class CategoryPage extends React.Component {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      className: 'cellStyle'
    },
    {
      title: 'Data Type',
      dataIndex: 'dataType',
      key: 'dataType',
      width: '10%',
      className: 'cellStyle'
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: '10%',
      className: 'cellStyle'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '25%',
      className: 'cellStyle'
    },
    {
      title: 'Definition',
      dataIndex: 'definition',
      key: 'definition',
      width: '30%',
      className: 'cellStyle'
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      className: 'cellStyle',
      render: (text, record) => (
        <span>
          <Popconfirm
            placement="top"
            title={'Do you want to delete this record?'}
            onConfirm={() => this.deleteCategory(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Icon type="delete" />
          </Popconfirm>
        </span>
      )
    }
  ]
  deleteCategory(id) {
    this.props.categoryStore.deleteCategory(id)
  }

  @computed
  get formProps() {
    let { errors, categories, category } = this.props.categoryStore
    let formObj = toJS(category)
    formObj.code = this.formatCode(formObj.name)
    let _errors = this.formatError(errors)
    return { errors: _errors, category, categories, formObj }
  }
  @computed
  get categories() {
    return this.props.categoryStore.categories
  }

  componentWillMount() {
    this.props.categoryStore.loadCategories()
  }
  onCreate = cate => {
    this.props.categoryStore.createCategory(cate)
  }
  updateFormValue = (f, v) => {
    this.props.categoryStore.updateFormValue(f, v)
  }
  formatCode = str => str.toLowerCase().replace(/ /g, '_')
  formatError = errors => {
    let _errors = Object.assign({}, errors)
    delete _errors.hasError
    let arr = Object.values(_errors)
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) _errors.hasError = true
    }
    return _errors
  }

  render() {
    return (
      <div>
        <CategoryForm
          {...this.formProps}
          onCreate={this.onCreate}
          updateFormValue={this.updateFormValue}
        />
        <Row className="rowStyle">
          <Table
            rowKey="id"
            pagination={{ pageSize: 5 }}
            dataSource={this.categories ? this.categories.slice() : []}
            columns={this.columns}
          />
        </Row>
      </div>
    )
  }
}

CategoryPage.propTypes = {
  categoryStore: PropTypes.object
}
export default CategoryPage
