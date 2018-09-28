import React from 'react'
import PropTypes from 'prop-types'
import { Input, Row, Col, Button, Radio } from 'antd'
import ArticleType from '../../consts/ArticleType'
import '../../style/Page.css'
import styles from '../styles'
const RadioGroup = Radio.Group
const { TextArea } = Input

const CategoryForm = props => {
  let { errors, category, updateFormValue, formObj } = props
  let form = null
  const onSubmit = e => {
    e.preventDefault()
    category.name = form.name.value
    category.dataType = form.dataType.value
    category.definition = form.definition.value
    category.description = form.description.value
    category.code = formObj.code
    props.onCreate(category)
    return false
  }
  const onReset = () => {
    form.name.value = ''
    form.description.value = ''
    form.dataType[0].click()
  }
  const dataTypeChange = e => {
    updateFormValue('dataType', form.dataType.value)
  }
  // style={show ? {} : { display: 'none' }}
  const loadDefinition = () => {
    return (
      <Row
        className="rowStyle"
        style={category.dataType === 'json' ? {} : { display: 'none' }}
        type="flex"
        align={'middle'}
      >
        <Col span={2}>Definition :</Col>
        <Col span={10}>
          <TextArea
            style={errors.definition ? styles.errorField : {}}
            onChange={e => {
              updateFormValue('definition', e.target.value)
            }}
            placeholder="Definition"
            name="definition"
          />
        </Col>
        <Col span={10}>
          <div style={styles.errorMsg}>{errors.definition}</div>
        </Col>
      </Row>
    )
  }
  return (
    <div>
      <form
        onSubmit={onSubmit}
        ref={input => {
          form = input
        }}
      >
        <Row className="rowStyle" type="flex" align={'middle'}>
          <Col span={2}>Category Name:</Col>
          <Col span={10}>
            <Input
              style={errors.name ? styles.errorField : {}}
              onChange={e => {
                updateFormValue('name', e.target.value)
              }}
              placeholder="Category Name"
              name="name"
            />
          </Col>
          <Col span={10}>
            <div style={styles.errorMsg}>{errors.name}</div>
          </Col>
        </Row>
        <Row className="rowStyle" type="flex" align={'middle'}>
          <Col span={2}>Category Code:</Col>
          <Col span={10}>
            <div>{formObj.code}</div>
          </Col>
        </Row>
        <Row className="rowStyle" type="flex" align={'middle'}>
          <Col span={2}>Data Type:</Col>
          <Col span={10}>
            <RadioGroup
              name="dataType"
              onChange={dataTypeChange}
              defaultValue={ArticleType.MARKDOWN}
            >
              <Radio value={'markdown'}>Markdown</Radio>
              <Radio value={'json'}>Json</Radio>
            </RadioGroup>
          </Col>
        </Row>
        {loadDefinition()}
        <Row className="rowStyle">
          <Col span={2}>Description:</Col>
          <Col span={10}>
            <TextArea
              style={errors.description ? styles.errorField : {}}
              rows={4}
              placeholder="Description"
              name="description"
            />
          </Col>
          <Col span={10}>
            <div style={styles.errorMsg}>{errors.description}</div>
          </Col>
        </Row>
        <Row type="flex" className="rowStyle">
          <Col span={4}>
            <Button type="primary" htmlType="submit">
              Create Category
            </Button>
          </Col>
          <Col span={2}>
            <Button onClick={onReset}>Reset Form</Button>
          </Col>
        </Row>
      </form>
    </div>
  )
}
CategoryForm.propTypes = {
  errors: PropTypes.object,
  category: PropTypes.object,
  formObj: PropTypes.object,
  updateFormValue: PropTypes.func,
  onCreate: PropTypes.func
}
export default CategoryForm
