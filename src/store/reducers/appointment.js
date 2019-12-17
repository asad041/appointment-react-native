import {
  GET_APPOINTMENTS,
  ADD_APPOINTMENT,
  LOADING_APPOINTMENT,
} from '../actions';

const initialState = {
  appointments: [],
  appointment: null,
  loading: true,
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case LOADING_APPOINTMENT:
      return {
        ...state,
        loading: payload,
      };

    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: payload,
        loading: false,
      };

    case ADD_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.unshift(payload),
        loading: false,
      };

    default:
      return state;
  }
};
