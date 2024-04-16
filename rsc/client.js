import { hydrateRoot } from 'react-dom/client'

let currentPathname = window.location.pathname
const root = hydrateRoot(document, getInitialClientJSX())

function getInitialClientJSX() {
  const clientJSX = JSON.parse(window.__INITIAL_CLIENT_JSX_STRING__, parseJSX)
  return clientJSX
}

async function navigate(pathname) {
  currentPathname = pathname
  const clientJSX = await fetchClientJSX(pathname)
  if (pathname === currentPathname) {
    root.render(clientJSX)
  }
}

async function fetchClientJSX(pathname) {
  const response = await fetch(pathname + '?jsx')
  const clientJSXString = await response.text()
  const clientJSX = JSON.parse(clientJSXString, parseJSX)
  return clientJSX
}

function parseJSX(key, value) {
  if (value === '$RE') {
    return Symbol.for('react.element')
  } else if (typeof value === 'string' && value.startsWith('$$')) {
    return value.slice(1)
  } else {
    return value
  }
}

window.addEventListener(
  'click',
  e => {
    // 忽略非 <a> 标签点击事件
    if (e.target.tagName !== 'A') {
      return
    }
    // 忽略 "open in a new tab".
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return
    }
    // 忽略外部链接
    const href = e.target.getAttribute('href')
    if (!href.startsWith('/')) {
      return
    }
    // 组件浏览器重新加载页面
    e.preventDefault()
    // 但是 URL 还是要更新
    window.history.pushState(null, null, href)
    // 调用我们自己的导航逻辑
    navigate(href)
  },
  true,
)

window.addEventListener('popstate', () => {
  // 处理浏览器前进后退事件
  navigate(window.location.pathname)
})
