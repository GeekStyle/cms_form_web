import React from 'react'
import PropTypes from 'prop-types'
import { Input, Row, Col, Button, DatePicker } from 'antd'
import FormUtil from '../../utils/FormUtil'
import DateUtil from '../../utils/DateUtil'
import '../../style/Page.css'
import styles from '../styles'

const ArticleSearchForm = props => {
  let { categories, handleFormSearch } = props
  let startDt = null
  let endDt = null
  let form = null
  const onSubmit = e => {
    e.preventDefault()
    let article = { subject: form.subject.value, code: form.code.value }
    article.startDt = startDt.picker.input.value
    article.endDt = endDt.picker.input.value
    handleFormSearch(article)
    return false
  }
  const onReset = () => {
    form.subject.value = ''
    form.code.value = ''
    FormUtil.SetDateValue(startDt,null)
    FormUtil.SetDateValue(endDt,null)
    // startDt.picker.input.value = ''
    // endDt.picker.input.value = ''
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        ref={input => {
          form = input
        }}
      >
        <Row className="rowStyle" gutter={16} type="flex" align={'middle'}>
          <Col span={3}>
            <Input placeholder="Search Key Words" name="subject" />
          </Col>
          <Col span={3.1}>
            <div>
              <select style={styles.selectBox} name="code">
                <option key="0" value="">
                  Select a Category
                </option>
                {categories.map(cate => (
                  <option key={cate.code} value={cate.code}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
          </Col>
          <Col span={1.5}>
            <DatePicker
              placeholder="Search Start Date"
              format={DateUtil.DefaultFormat}
              ref={input => {
                startDt = input
              }}
            />
          </Col>
          <Col span={1.5}>
            <DatePicker
              placeholder="Search End Date"
              format={DateUtil.DefaultFormat}
              ref={input => {
                endDt = input
              }}
            />
          </Col>
          <Col span={1.5}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Col>
          <Col span={2}>
            <Button onClick={onReset}>Reset</Button>
          </Col>
        </Row>
      </form>
    </div>
  )
}

ArticleSearchForm.propTypes = {
  categories: PropTypes.array,
  handleFormSearch: PropTypes.func
}
export default ArticleSearchForm
