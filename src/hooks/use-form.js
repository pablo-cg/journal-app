import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialState = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialState);
  const [validations, setValidations] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialState);
  }, [initialState]);

  const isFormValid = useMemo(() => {
    const validationValues = Object.values(validations);

    return !validationValues.some((value) => value !== null);
  }, [validations]);

  function onInputChange({ target }) {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  }

  function resetForm() {
    setFormState(initialState);
  }

  function createValidators() {
    const validatedValues = {};

    for (const key of Object.keys(formValidations)) {
      const [isValid, message] = formValidations[key];

      validatedValues[`${key}Message`] = isValid(formState[key])
        ? null
        : message;
    }

    setValidations(validatedValues);
  }

  return { resetForm, onInputChange, formState, ...validations, isFormValid };
};
