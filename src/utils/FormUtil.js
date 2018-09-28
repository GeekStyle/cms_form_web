import React from 'react'
import { Select } from 'antd'
const Option = Select.Option
const FormUtil = {}
FormUtil.GetDateValue = ref => ref.picker.input.value
FormUtil.SetDateValue = (ref, value) => {
  ref.picker.state.value = value
  ref.forceUpdate()
}
FormUtil.GetSelectValue = ref => ref.rcSelect.state.value
FormUtil.SetSelectValue = (ref, value) => {
  ref.rcSelect.state.value = value
  ref.forceUpdate()
}
FormUtil.GetCheckValue = ref => ref.rcCheckbox.state.checked
FormUtil.SetCheckValue = (ref, value) => {
  ref.rcCheckbox.state.checked = value
  ref.rcCheckbox.forceUpdate()
}
FormUtil.GetRadioValue = ref => ref.state.value
FormUtil.SetRadioValue = (ref, value) => {
  ref.state.value = value
  ref.forceUpdate()
}
FormUtil.LoadOptions = (dataArray, props) => {
  return (
    <Select {...props}>
      {dataArray.map(ele => (
        <Option key={ele.value} value={ele.value}>
          {ele.label}
        </Option>
      ))}
    </Select>
  )
}
FormUtil.filterOption = (input, option) => {
  if (!option.props.children) return false
  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
export default FormUtil
