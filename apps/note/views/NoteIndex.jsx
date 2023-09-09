import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteEdit } from "../views/EditNote.jsx"
import { NoteFilter } from "../views/NoteFilter.jsx"
import { FilterSide } from "./FilterSide.jsx"


const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [note, setNote] = useState(noteService.getEmptyNote())
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [showDeleted, setShowDeleted] = useState(false);
    const [showArchived, setShowArchived] = useState(false);
    const [showNotDeletedOrArchived, setShowNotDeletedOrArchived] = useState(false);




    useEffect(() => {
        noteService.query().then(setNotes);
    }, [note]);

    useEffect(() => {
        noteService.query({ ...filterBy, showDeleted, showArchived, showNotDeletedOrArchived }).then(setNotes);
    }, [filterBy, showDeleted, showArchived, showNotDeletedOrArchived]);



    // function onSaveNote(note){
    //     noteService.save(note).then(savedNote=>{
    //         const updatedNoted= notes.map(n=> n.id === savedNote.id? savedNote : n);
    //         setNotes(updatedNoted)
    //     })
    // }

    function onRemoveNote(noteId) {
        noteService.get(noteId).then((deletedNote) => {
            deletedNote.isDeleted = true;
            noteService.save(deletedNote).then(() => {
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note.id === noteId ? { ...note, isDeleted: true } : note
                    )
                );

                // Update filterBy to trigger the useEffect
                setFilterBy((prevFilter) => ({
                    ...prevFilter,
                    _dummyKey: Math.random(), // Change _dummyKey to force re-render
                }));

                showSuccessMsg(`Note Deleted!`);
            });
        });
    }
    function onMoveToArchive(noteId) {
        noteService.get(noteId).then((archivedNote) => {
            archivedNote.isArchived = true; // Set isArchived to true
            noteService.save(archivedNote).then(() => {
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note.id === noteId ? { ...note, isArchived: true } : note
                    )
                );

                // Update filterBy to trigger the useEffect
                setFilterBy((prevFilter) => ({
                    ...prevFilter,
                    _dummyKey: Math.random(), // Change _dummyKey to force re-render
                }));

                showSuccessMsg(`Note Moved to Archive!`);
            });
        });
    }
    function toggleShowAll() {
        setShowNotDeletedOrArchived(false);
        setShowDeleted(false);
        setShowArchived(false);
    }

    function toggleShowNotDeletedOrArchived() {
        setShowNotDeletedOrArchived(true);
        setShowDeleted(false);
        setShowArchived(false);
    }


    function toggleShowDeleted() {
        setShowNotDeletedOrArchived(false);
        setShowDeleted(true);
        setShowArchived(false);
    }

    function toggleShowArchived() {
        setShowNotDeletedOrArchived(false);
        setShowDeleted(false);
        setShowArchived(true);
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
        // note.time = Date.now();
        noteService.save(note)
        showSuccessMsg(`Note Updated!`)
        // Implement the logic to save edited content here
        // This function should update the notes data with the edited content
        console.log(`Saving edited content for noteId ${note}:`, editedContent);
    }
    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <aside className="header">
                <FilterSide toggleShowNotDeletedOrArchived={toggleShowNotDeletedOrArchived} toggleShowDeleted={toggleShowDeleted} toggleShowArchived={toggleShowArchived} />
            </aside>
            <main className="main">
                <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <NoteEdit note={note} onSetNote={onSetNote} />
                {/* <div>
                <button onClick={toggleShowNotDeletedOrArchived}>Show Not Deleted or Archived Notes</button>
                    <button onClick={toggleShowDeleted}>Show Deleted Notes</button>
                    <button onClick={toggleShowArchived}>Show Archived Notes</button>
                </div> */}
                <div>
                    {/* <button onClick={toggleShowArchived}>Show Archived Notes</button> */}
                    {/* <button onClick={toggleShowNotArchived}>Show Not Archived Notes</button> */}
                </div>
                <NoteList
                    notes={notes}
                    onSaveEditedContent={onSaveEditedContent}
                    onRemoveNote={onRemoveNote}
                    onMoveToArchive={onMoveToArchive}
                />
            </main>
        </section>
    );
}





