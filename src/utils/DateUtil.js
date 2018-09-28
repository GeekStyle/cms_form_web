import moment from 'moment'
const DateUtil = {}
DateUtil.DefaultFormat = 'DD MMM YYYY'
DateUtil.DefaultFormatWithSlash = 'DD/MM/YYYY'
DateUtil.SimpleDateFormat = 'YYYY-MM-DD'
DateUtil.formatDate = (date, dtFormat) => {
  if (!dtFormat) dtFormat = DateUtil.DefaultFormat
  return moment(date).format(dtFormat)
}
DateUtil.GetMoment = date => moment(date)

DateUtil.DateDiffHours = (from, to) => {
  if (!to) {
    to = new Date()
  }
  return Math.round(Math.abs(to - new Date(from)) / 36e5)
}

DateUtil.displayDateInDefaultFormat = date => {
  if (date) {
    return moment(date, DateUtil.SimpleDateFormat).format(
      DateUtil.DefaultFormat
    )
  }
}

DateUtil.displayDateInSdf = date => {
  if (date) {
    return moment(date, DateUtil.DefaultFormat).format(
      DateUtil.SimpleDateFormat
    )
  } else {
    return null
  }
}

export default DateUtil
