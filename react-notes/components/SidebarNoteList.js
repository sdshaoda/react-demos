import dayjs from 'dayjs' // 注意 dayjs 不会被打包到 client，因为现在是 server component

export default async function NoteList({ notes }) {
  const arr = Object.entries(notes)

  if (arr.length == 0) {
    return <div className='notes-empty'>{'No notes created yet!'}</div>
  }

  return (
    <ul className='notes-list'>
      {arr.map(([noteId, note]) => {
        const { title, updateTime } = JSON.parse(note)
        return (
          <li key={noteId}>
            <header className='sidebar-note-header'>
              <strong>{title}</strong>
              <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
            </header>
          </li>
        )
      })}
    </ul>
  )
}
