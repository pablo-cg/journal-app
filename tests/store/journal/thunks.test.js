import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { firestore } from '../../../src/firebase/config';
import {
  addNote,
  setActiveNote,
  setSaving,
  startNewNote,
} from '../../../src/store/journal';
import { authenticatedState } from '../../fixtures/auth-fixtures';

jest.mock('../../../src/firebase/providers');

describe('journal thunks Tests', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('startNewNote debe crear una nota en blanco', async () => {
    getState.mockReturnValue({ auth: authenticatedState });

    const emptyNote = {
      body: '',
      title: '',
      date: expect.any(Number),
      id: expect.any(String),
    };

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setSaving(true));
    expect(dispatch).toHaveBeenCalledWith(addNote(emptyNote));
    expect(dispatch).toHaveBeenCalledWith(setActiveNote(emptyNote));

    // Borrar de firebase
    const collectionReference = collection(
      firestore,
      `${authenticatedState.user.uid}/journal/notes`
    );

    const docs = await getDocs(collectionReference);

    const docsToDelete = [];

    docs.forEach((doc) => docsToDelete.push(deleteDoc(doc.ref)));

    await Promise.all(docsToDelete);
  });
});
