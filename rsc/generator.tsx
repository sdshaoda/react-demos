import React from 'react'
import { Layout, IndexPage, PostPage } from './components'
import { renderJSXToHTML, renderJSXToClientJSX, stringifyJSX } from './utils'

export async function jsxGenerator(url) {
  let clientJSX = await renderJSXToClientJSX(<Router url={url} />)
  const clientJSXString = JSON.stringify(clientJSX, stringifyJSX)
  return clientJSXString
}

export async function htmlGenerator(url) {
  let jsx = <Router url={url} />
  let html = await renderJSXToHTML(jsx)
  // 获取当前页面的客户端 JSX 对象
  const clientJSX = await renderJSXToClientJSX(jsx)
  // 拼接到脚本代码中
  const clientJSXString = JSON.stringify(clientJSX, stringifyJSX)
  html += `<script>window.__INITIAL_CLIENT_JSX_STRING__ = `
  html += JSON.stringify(clientJSXString).replace(/</g, '\\u003c')
  html += `</script>`
  html += `
  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18.2.0",
        "react-dom/client": "https://esm.sh/react-dom@18.2.0/client?dev"
      }
    }
  </script>
  <script type="module" src="/client.js"></script>
`
  return html
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
