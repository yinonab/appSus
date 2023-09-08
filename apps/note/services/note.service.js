import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    // getNextBookId,
    getDefaultFilter,
    setFilterBy,
    // addReview,
    // getEmptyReview,
    // deleteReview
}

function query(filterBy = {}) {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.info && filterBy.info.txt) { // Check if filterBy.info exists
                const regex = new RegExp(filterBy.info.txt, 'i')
                notes = notes.filter(note => regex.test(note.info.txt))
            }
            if (filterBy.info && filterBy.info.title) {
                const regex = new RegExp(filterBy.info.title, 'i')
                notes = notes.filter(note => regex.test(note.info.title))
            }
          
            return notes
        })
}
function get(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    console.log('note:', note)
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}
function getDefaultFilter() {
    return { info: '', title: '' }
}
function setFilterBy(filterBy = {}) {
    if (filterBy.info !== undefined) filterBy.info = filterBy.info
    if (filterBy.title !== undefined) filterBy.title = filterBy.title
    return filterBy
}

function getEmptyNote(id = '', type = '', title, txt = '',time = Date.now()) {
    return {
        id,
        time,
        type: 'NoteTxt',
        isPinned: false,
        isDeleted: false,
        style: {
            backgroundColor: '#edbebe'
        },
        info: {
            title,
            txt
        }
    }
}
function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                time: Date.now(),
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#f0f4c3'
                },
                info: {
                    title: 'Welcome to Academy Keep',
                    txt: "Academy Keep lets you quickly capture what’s on your mind.To start a new note, list, or photo note, use the 'Add note' bar above."
                }
            },
            // {
            //     id: 'n102',
            //     type: 'NoteImg',
            //     isPinned: false,
            //     info: {
            //         url: 'http://some-img/me',
            //         title: 'Bobi and Me'
            //     },
            //     style: {
            //         backgroundColor: '#edbebe'
            //     }
            // },
            // {
            //     id: 'n103',
            //     type: 'NoteTodos',
            //     isPinned: false,
            //     info: {
            //         title: 'Get my stuff together',
            //         todos: [
            //             { txt: 'Driving license', doneAt: null },
            //             { txt: 'Coding power', doneAt: 187111111 }
            //         ]
            //     }
            // }

        ]
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}
