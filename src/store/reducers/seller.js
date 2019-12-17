import {
  GET_SELLERS,
  GET_SELLER,
  SEARCH_SELLER,
  SELLER_LOADING,
  NOT_FOUND_SELLER,
} from '../actions';

const initialState = {
  sellers: [],
  seller: null,
  loading: true,
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SELLER_LOADING:
      return {
        ...state,
        loading: payload,
      };

    case GET_SELLERS:
    case SEARCH_SELLER:
      return {
        ...state,
        sellers: payload,
        loading: false,
      };

    case GET_SELLER:
      return {
        ...state,
        seller: payload,
        loading: false,
      };

    case NOT_FOUND_SELLER:
      return {
        ...state,
        seller: null,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
