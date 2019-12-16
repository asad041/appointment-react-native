export const INPUT_UPDATE = 'INPUT_UPDATE';

export const SING_UP_INPUTS = {
  inputValues: {
    email: '',
    fullname: '',
    password: '',
  },
  inputValidities: {
    email: false,
    fullname: false,
    password: false,
  },
  formIsValid: false,
};

export const LOG_IN_INPUTS = {
  inputValues: {
    email: '',
    password: '',
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

export const FormReducer = (state, action) => {
  if (action.type === INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }

  return state;
};
