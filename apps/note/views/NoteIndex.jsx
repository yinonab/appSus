import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { NoteList } from "../cmps/NoteList.jsx"


const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        console.log('mount')
        noteService.query().then(setNotes)
    }, [])

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            showSuccessMsg(`Note Removed! ${noteId}`)
        })
        .catch(err => {
            console.log('err:', err)
            showErrorMsg('Problem Removing ' + noteId)
        })
    }

    console.log('render')
    if (!notes) return <div>Loading...</div>
    return (<section className="note-index">
        {/* <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <Link to="/book/edit" >Add Book</Link> */}
        <NoteList notes={notes} onRemoveNote={onRemoveNote} />
    </section>)
}
