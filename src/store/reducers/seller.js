import {GET_SELLERS} from '../actions';

const initialState = {
  sellers: [],
  seller: null,
  loading: true,
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case GET_SELLERS:
      return {
        ...state,
        sellers: payload,
        loading: false,
      };

    default:
      return state;
  }
};
