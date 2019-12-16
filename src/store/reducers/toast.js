import {SET_TOAST, REMOVE_TOAST} from '../actions';

const initialState = [];

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_TOAST:
      return [...state, payload];
    case REMOVE_TOAST:
      return state.filter(alert => alert.id !== payload);

    default:
      return state;
  }
};
