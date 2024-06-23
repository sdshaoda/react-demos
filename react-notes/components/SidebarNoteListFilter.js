'use client'

import { useSearchParams } from 'next/navigation'

export default function SidebarNoteListFilter({ notes }) {
  // 获取网页搜索参数
  const searchParams = useSearchParams()
  const searchText = searchParams.get('q')

  return (
    <ul className='notes-list'>
      {notes.map((item, index) => {
        const title = item.props.title
        // 判断笔记标题中是否包含搜索字符
        if (
          !searchText ||
          (searchText && title.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return <li key={index}>{item}</li>
        }
        return null
      })}
    </ul>
  )
}
