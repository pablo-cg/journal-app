import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { firestore } from '../../firebase/config';
import { getNotes, uploadToCloudinary } from '../../helpers';
import {
  addNote,
  removeNoteById,
  setActiveNote,
  setActiveNoteImages,
  setNotes,
  setSaving,
  updateNote,
} from './journal-slice';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving(true));

    const { user } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(firestore, `${user.uid}/journal/notes`));

    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { user } = getState().auth;

    const notes = await getNotes(user.uid);

    dispatch(setNotes(notes));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving(true));

    const { user } = getState().auth;
    const { activeNote } = getState().journal;

    const noteToSave = { ...activeNote };

    delete noteToSave.id;

    const docRef = doc(firestore, `${user.uid}/journal/notes/${activeNote.id}`);

    await setDoc(docRef, noteToSave, { merge: true });

    dispatch(updateNote(activeNote));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving(true));

    const uploadList = [];

    for (const file of files) {
      uploadList.push(uploadToCloudinary(file));
    }

    const uploadedFiles = await Promise.all(uploadList);

    const filesUrls = uploadedFiles.map((file) => file.secure_url);

    dispatch(setActiveNoteImages(filesUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving(true));

    const { user } = getState().auth;
    const { activeNote } = getState().journal;

    const docRef = doc(firestore, `${user.uid}/journal/notes/${activeNote.id}`);

    await deleteDoc(docRef);

    dispatch(removeNoteById(activeNote.id));
  };
};
