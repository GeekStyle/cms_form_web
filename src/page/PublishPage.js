import React from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col, Input } from 'antd'
import { computed, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import styles from '../components/styles'
import '../style/Page.css'
import 'simplemde/dist/simplemde.min.css'
import FormUtil from '../utils/FormUtil'
import LibUtil from '../utils/LibUtil'
import FormMapping from '../consts/FormMapping'

@inject('articleStore', 'categoryStore', 'rootStore')
@observer
class PublishPage extends React.Component {
  fileUploader = null
  form = null
  codeRef = null
  componentWillMount() {
    LibUtil.hasText(false)
    this.props.categoryStore.loadCategories()
  }
  handleUploadChange = e => {
    const file = this.fileUploader.files[0]
    if (file) {
      this.props.articleStore.uploadFile(file)
    }
  }
  onSubmit = e => {
    console.log('================')
    e.preventDefault()
    let art = {}
    art.subject = this.form.subject.value
    art.tags = this.form.tags.value
    art.port = this.form.port.value
    art.featurePic = this.form.featurePic.value
    art.code = FormUtil.GetSelectValue(this.codeRef)[0]
    this.props.articleStore.createArticle(art, this.onReset)
    return false
  }
  onReset = () => {
    this.form.subject.value = ''
    this.form.tags.value = ''
    this.form.port.value = ''
    this.form.featurePic.value = ''
  }
  handleFieldChange(field, event) {
    this.props.articleStore.handleFieldChange(field, event.target.value)
  }
  handleContentChange = value => {
    console.log(`${value}------------`)
    LibUtil.hasText(true)
    this.props.articleStore.handleFieldChange('content', value)
  }
  @computed
  get errors() {
    return this.props.articleStore.errors
  }
  @computed
  get categories() {
    return this.props.categoryStore.categories.slice()
  }
  @computed
  get jsonArray() {
    return toJS(this.props.articleStore.jsonArray)
  }
  @computed
  get jsonObject() {
    return toJS(this.props.articleStore.jsonObject)
  }
  add = newObject => {
    this.props.articleStore.addJson(newObject)
    return true
  }
  remove = (rmObj, index) => {
    this.props.articleStore.removeJson(rmObj, index)
    return true
  }
  update = (uptObj, index) => {
    this.props.articleStore.updateJson(uptObj, index)
    return true
  }
  updateObject = uptObj => {
    this.props.articleStore.updateJsonObj(uptObj)
    return true
  }

  copyToClipboard = str => {
    const el = document.createElement('textarea')
    el.value = str
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  onCategoryChange = code => {
    // let cate = null
    // for (let _cate of this.categories) {
    //   if (_cate.code === code) {
    //     cate = _cate
    //   }
    // }

    this.props.articleStore.changeSelCategory(code)
    this.props.articleStore.handleFieldChange('code', code)
  }
  render() {
    let code = toJS(this.props.articleStore.code)
    let article = toJS(this.props.articleStore.article)
    let FormDetail = FormMapping.loadForm(code)
    let errors = this.errors
    let fileList = this.props.articleStore.fileList
    return (
      <div>
        <div style={{ paddingBottom: 24 }}>
          <form
            onSubmit={this.onSubmit}
            ref={input => {
              this.form = input
            }}
          >
            <Row type="flex" className="rowStyle">
              <Col span={12}>
                <Input
                  placeholder="Your article subject"
                  style={errors.subject ? styles.errorField : {}}
                  name="subject"
                  onChange={e => this.handleFieldChange('subject', e)}
                />
              </Col>
              <Col span={10}>
                <div style={styles.errorMsg}>{errors.subject}</div>
              </Col>
            </Row>
            <Row type="flex" className="rowStyle">
              <Col span={12}>
                <Input
                  placeholder="Tags, use comma(,) to seperate."
                  style={errors.tags ? styles.errorField : {}}
                  name="tags"
                  onChange={e => this.handleFieldChange('tags', e)}
                />
              </Col>
              <Col span={10}>
                <div style={styles.errorMsg}>{errors.tags}</div>
              </Col>
            </Row>
            <Row type="flex" className="rowStyle">
              <Col span={12}>
                <Input
                  placeholder="Port Information(if applicable)"
                  style={errors.port ? styles.errorField : {}}
                  name="port"
                  onChange={e => this.handleFieldChange('port', e)}
                />
              </Col>
              <Col span={10}>
                <div style={styles.errorMsg}>{errors.port}</div>
              </Col>
            </Row>
            <Row type="flex" className="rowStyle">
              <Col span={12}>
                <Input
                  placeholder="Feature Pic(if applicable)"
                  style={errors.featurePic ? styles.errorField : {}}
                  name="featurePic"
                  onChange={e => this.handleFieldChange('featurePic', e)}
                />
              </Col>
              <Col span={10}>
                <div style={styles.errorMsg}>{errors.featurePic}</div>
              </Col>
            </Row>
            <Row type="flex" align={'middle'} className="rowStyle">
              <Col span={6}>
                <div style={errors.code ? styles.errorDiv : {}}>
                  {FormUtil.LoadOptions(FormMapping.FORMCODES, {
                    onChange: this.onCategoryChange,
                    placeholder: 'Select a Category.',
                    ref: ref => {
                      this.codeRef = ref
                    }
                  })}
                </div>
              </Col>
              <Col span={10}>
                <div style={styles.errorMsg}>{errors.code}</div>
              </Col>
            </Row>
            <Row type="flex" className="rowStyle">
              <Col span={6} order={4}>
                <Button type="primary" htmlType="submit">
                  Publish Article
                </Button>
              </Col>
            </Row>
          </form>
        </div>
        <Row type="flex" className="rowStyle">
          <Col span={24}>{this.JsonString}</Col>
        </Row>
        <Row type="flex" className="rowStyle" style={{ overflowX: 'auto' }}>
          <Col span={24}>
            <FormDetail
              content={article.content}
              onChange={this.handleContentChange}
            />
          </Col>
        </Row>
        <Row type="flex" className="rowStyle ">
          <Col className="btn-file" span={24}>
            <input
              type="file"
              ref={input => {
                this.fileUploader = input
              }}
              onChange={this.handleUploadChange}
            />
          </Col>
        </Row>
        <Row type="flex" className="rowStyle">
          <Col span={24}>
            {fileList.map(file => (
              <div className="crew-thumb" key={file.url}>
                <img width="50px" height="50px" src={file.url} />
                <span> {file.url}</span>
                <Button
                  className="btn-copy"
                  type="primary"
                  size="small"
                  onClick={e => {
                    this.copyToClipboard(file.url)
                  }}
                >
                  Copy
                </Button>
              </div>
            ))}
          </Col>
        </Row>
      </div>
    )
  }
}
PublishPage.propTypes = {
  categoryStore: PropTypes.object,
  articleStore: PropTypes.object
}
export default PublishPage
