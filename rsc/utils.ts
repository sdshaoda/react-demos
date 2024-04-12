import escapeHtml from 'escape-html'

export async function renderJSXToHTML(jsx) {
  if (typeof jsx === 'string' || typeof jsx === 'number') {
    return escapeHtml(jsx)
  } else if (jsx == null || typeof jsx === 'boolean') {
    return ''
  } else if (Array.isArray(jsx)) {
    // 这里添加了 await 和 Promise.all
    const childHtmls = await Promise.all(
      jsx.map(child => renderJSXToHTML(child)),
    )
    return childHtmls.join('')
  } else if (typeof jsx === 'object') {
    if (jsx.$$typeof === Symbol.for('react.element')) {
      if (typeof jsx.type === 'string') {
        // 普通 HTML 标签
        let html = '<' + jsx.type
        for (const propName in jsx.props) {
          if (jsx.props.hasOwnProperty(propName) && propName !== 'children') {
            html += ' '
            html += propName
            html += '='
            html += `"${escapeHtml(jsx.props[propName])}"`
          }
        }
        html += '>'
        // 这里添加了 await
        html += await renderJSXToHTML(jsx.props.children)
        html += '</' + jsx.type + '>'
        html = html.replace(/className/g, 'class')
        return html
      } else if (typeof jsx.type === 'function') {
        const Component = jsx.type
        const props = jsx.props
        // 这里添加了 await
        const returnedJsx = await Component(props)
        return renderJSXToHTML(returnedJsx)
      } else {
        throw new Error('Not implemented.')
      }
    } else {
      throw new Error('Cannot render an object.')
    }
  } else {
    throw new Error('Not implemented.')
  }
}
