import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
  saveMessage: null,
  notes: [],
  activeNote: null,
  //   activeNote: {
  //     id: '1',
  //     title: '',
  //     body: '',
  //     date: 11111,
  //     imgUrls: [],
  //   },
};

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNote(state, action) {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote(state, action) {
      state.activeNote = action.payload;
      state.saveMessage = null;
    },
    setNotes(state, action) {
      state.notes = action.payload;
    },
    setSaving(state, action) {
      state.isSaving = action.payload;

      if (!action.payload) {
        state.saveMessage = null;
      }
    },
    updateNote(state, { payload }) {
      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return payload;
        }
        return note;
      });

      state.isSaving = false;
      state.saveMessage = `${payload.title}, ha sido actualizada`;
    },
    setActiveNoteImages(state, action) {
      state.activeNote.imgUrls = [
        ...state.activeNote.imgUrls,
        ...action.payload,
      ];
      state.isSaving = false;
    },
    resetJournalState(state) {
      state.isSaving = false;
      state.saveMessage = null;
      state.notes = [];
      state.activeNote = null;
    },
    removeNoteById(state, action) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.activeNote = null;
      state.isSaving = false;
    },
  },
});

export const {
  addNote,
  removeNoteById,
  resetJournalState,
  setActiveNote,
  setActiveNoteImages,
  setNotes,
  setSaving,
  updateNote,
} = journalSlice.actions;
