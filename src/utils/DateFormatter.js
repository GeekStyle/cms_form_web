import dateFormat from 'dateformat'
const DATEFORMAT = 'yyyy-mm-dd HH:MM'
let DateFormatter = {}
DateFormatter.format = date => dateFormat(date, DATEFORMAT)
export default DateFormatter
