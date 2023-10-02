import DeleteOutline from '@mui/icons-material/DeleteOutline';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import UploadOutlined from '@mui/icons-material/UploadOutlined';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks';
import {
  setActiveNote,
  startDeletingNote,
  startSavingNote,
  startUploadingFiles,
} from '../../store/journal';
import { ImageGallery } from '../components';

import { useRef } from 'react';
import 'sweetalert2/dist/sweetalert2.css';

const validationSchema = {
  title: [(value) => value.trim().length > 3, 'Ingresa un título'],
};

export const NoteView = () => {
  const dispatch = useDispatch();

  const { activeNote, saveMessage, isSaving } = useSelector(
    (state) => state.journal
  );

  const { formState, onInputChange, titleMessage } = useForm(
    activeNote,
    validationSchema
  );

  const fecha = useMemo(() => {
    const dateString = new Date(formState.date);

    return dateString.toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [formState.date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (saveMessage) {
      Swal.fire({
        title: 'Nota Actualizada',
        titleText: saveMessage,
        icon: 'success',
        toast: true,
        timer: 2000,
      });
    }
  }, [saveMessage]);

  const fileInput = useRef();

  function handleUpdateNote() {
    dispatch(startSavingNote());
  }

  function onFileInputChange({ target }) {
    if (!target.files) return;

    dispatch(startUploadingFiles(target.files));
  }

  function handleDeleteNote() {
    dispatch(startDeletingNote());
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {fecha}
        </Typography>
      </Grid>

      <Grid container direction="row-reverse">
        <Button
          disabled={isSaving}
          onClick={handleUpdateNote}
          color="primary"
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <SaveOutlined />
          Guardar
        </Button>
        <input
          ref={fileInput}
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />
        <Button
          color="primary"
          disabled={isSaving}
          onClick={() => fileInput.current.click()}
        >
          <UploadOutlined />
          Subir Imagen
        </Button>
        <Button onClick={handleDeleteNote} color="error" disabled={isSaving}>
          <DeleteOutline />
          Borrar Nota
        </Button>
      </Grid>

      <Grid container direction="column" gap={3}>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none' }}
          error={!!titleMessage}
          helperText={titleMessage}
          name="title"
          value={formState.title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué pasó en el día hoy?"
          label="Descripción"
          minRows={5}
          name="body"
          value={formState.body}
          onChange={onInputChange}
        />
      </Grid>

      <ImageGallery images={activeNote.imgUrls} />
    </Grid>
  );
};
