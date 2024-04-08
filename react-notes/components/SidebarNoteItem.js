// 注意 dayjs 不会被打包到 client，因为现在是 server component
import dayjs from 'dayjs'
import SidebarNoteItemContent from '@/components/SidebarNoteItemContent'

export default function SidebarNoteItem({ noteId, note }) {
  const { title, content = '', updateTime } = note

  /**
   * 为什么这里要这么复杂
   * 把内容通过 props children 穿入到另一个组件 SidebarNoteItemContent 中？
   * 主要是为了使用服务端组件的优势 这个组件还是服务端组件
   */
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={note.title}
      expandedChildren={
        <p className='sidebar-note-excerpt'>
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      <header className='sidebar-note-header'>
        <strong>{title}</strong>
        <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
      </header>
    </SidebarNoteItemContent>
  )
}
