import React from 'react'
import PublishPage from '../page/PublishPage'
import CategoryPage from '../page/CategoryPage'
import ArticleListPage from '../page/ArticleListPage'

const MenuMapping = {}
MenuMapping.publish = <PublishPage />
MenuMapping.category = <CategoryPage />
MenuMapping.articles = <ArticleListPage />
MenuMapping.loadPage = page => {
  let ipage = MenuMapping[page]
  if (!ipage) {
    // return <div>404</div>
    return <PublishPage />
  } else {
    return ipage
  }
}
export default MenuMapping
