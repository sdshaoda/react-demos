import { getAllNotes } from '@/lib/redis'
import { sleep } from '@/lib/utils'
import SidebarNoteListFilter from '@/components/SidebarNoteListFilter'
import SidebarNoteItem from '@/components/SidebarNoteItem'

export default async function NoteList() {
  await sleep(3000)

  const notes = await getAllNotes()

  const arr = Object.entries(notes)

  if (arr.length == 0) {
    return <div className='notes-empty'>{'No notes created yet!'}</div>
  }

  return (
    <SidebarNoteListFilter
      notes={arr.map(([noteId, note]) => {
        return <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
      })}
    />
  )
}
