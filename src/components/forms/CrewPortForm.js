import React from 'react'
import PropTypes from 'prop-types'
import { Input, Col, Row, Button, Icon, Popconfirm } from 'antd'
import { observer } from 'mobx-react'
import '../../style/Page.css'

const CrewPortForm = props => {
  let form = null
  let onChange = props.onChange

  let content = props.content ? JSON.parse(props.content) : {}
  let images = content.images || []
  let onSubmit = e => {
    e.preventDefault()
    console.log(form)
  }
  let AddImage = () => {
    let info = GetFormInfo()
    images = images.filter(e => e.url !== form.imageUrl.value)
    images.push({ url: form.imageUrl.value })
    info.images = images
    onChange(JSON.stringify(info))
  }
  let RemoveImage = url => {
    let info = GetFormInfo()
    info.images = images.filter(e => e.url !== url)
    onChange(JSON.stringify(info))
  }
  let GetFormInfo = () => {
    let info = {}
    info.name = form.name.value
    info.address = form.address.value
    info.openTime = form.openTime.value
    info.tel = form.tel.value
    return info
  }
  let onFieldChange = () => {
    onChange(JSON.stringify(GetFormInfo()))
  }
  return (
    <form
      onSubmit={onSubmit}
      ref={input => {
        form = input
      }}
      style={{ width: '100%' }}
    >
      <Row gutter={16} className="crew-hotel">
        <Col span={10}>
          <Input placeholder="Hotel Name" name="name" onChange={onFieldChange} />
        </Col>
        <Col span={10}>
          <Input placeholder="Hotel Address" name="address" onChange={onFieldChange} />
        </Col>
      </Row>
      <Row gutter={16} className="crew-hotel">
        <Col span={10}>
          <Input placeholder="Hotel Open Time" name="openTime" onChange={onFieldChange} />
        </Col>
        <Col span={10}>
          <Input placeholder="Hotel Tel Number" name="tel" onChange={onFieldChange} />
        </Col>
      </Row>
      <Row gutter={16} className="crew-hotel">
        <Col span={10}>
          <Row gutter={16}>
            <Col span={20}>
              <Input placeholder="Image Url" name="imageUrl" />
            </Col>
            <Col span={4}>
              <Button className="btn-add-image" type="primary" onClick={AddImage}>
                Add Image
            </Button>
            </Col>
          </Row>
        </Col>
        <Col span={10}></Col>
      </Row>
      <Row gutter={16} className="crew-hotel">
        {images.map(image => (
          <div>
            {image.url}{' '}
            <Popconfirm
              placement="top"
              title={'Do you want to delete this record?'}
              onConfirm={() => {
                RemoveImage(image.url)
              }}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" />
            </Popconfirm>
          </div>
        ))}
      </Row>
    </form>
  )
}
CrewPortForm.propTypes = {
  onChange: PropTypes.func,
  content: PropTypes.any
}
export default observer(CrewPortForm)
