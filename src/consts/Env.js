const isProduction = process.env.NODE_ENV === 'production'
const URI_PREFIX = isProduction ? '/api/cms' : 'http://www.sit1.bwoilmarine.com/api/cms'

const GetUrl = uri => URI_PREFIX + uri
export { isProduction, URI_PREFIX, GetUrl }
