import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteEdit } from "../views/EditNote.jsx"
import { NoteFilter } from "../views/NoteFilter.jsx"
import { FilterSide } from "./FilterSide.jsx"
// import { NotePreview } from "../cmps/NotePreview.jsx"


const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [note, setNote] = useState(noteService.getEmptyNote())
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        noteService.query().then(setNotes);
    }, [note]);

    useEffect(() => {
        noteService.query(filterBy).then(setNotes);
    }, [filterBy]);

    // function onSaveNote(note){
    //     noteService.save(note).then(savedNote=>{
    //         const updatedNoted= notes.map(n=> n.id === savedNote.id? savedNote : n);
    //         setNotes(updatedNoted)
    //     })
    // }

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
    function onSetNote(note) {
        setNote(prevNote => ({ ...prevNote, ...note }))
    }
    function onSetFilterBy(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
    function onSaveEditedContent(note, editedContent) {
        console.log('variable:', note, editedContent)
        note.info.title = editedContent.title;
        note.info.txt = editedContent.txt;
        noteService.save(note)
        // Implement the logic to save edited content here
        // This function should update the notes data with the edited content
        console.log(`Saving edited content for noteId ${note}:`, editedContent);
    }
    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <header className="header">
                <FilterSide />
            </header>
            <main className="main">
                <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <NoteEdit note={note} onSetNote={onSetNote} />
                {/* <NotePreview note={note} onRemoveNote={onRemoveNote} /> */}
                <NoteList notes={notes} onSaveEditedContent={onSaveEditedContent} onRemoveNote={onRemoveNote} />
            </main>
            {/* <aside className="aside">
                
            </aside> */}
        </section>)
}
