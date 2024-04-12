import React from 'react'
import { renderJSXToHTML } from './utils'
import { Layout, IndexPage, PostPage } from './components'

export async function htmlGenerator(url) {
  return renderJSXToHTML(<Router url={url} />)
}

function Router({ url }) {
  if (url.pathname === '/favicon.ico') {
    return
  }
  let page
  if (url.pathname === '/') {
    page = <IndexPage />
  } else {
    const slug = url.pathname.slice(1)
    page = <PostPage slug={slug} />
  }
  return <Layout>{page}</Layout>
}
