import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  FETCH_CARD,
  COMMENT,
} from "./cardConstants";

const reducers = (state = { cards: [], card: null }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, cards: action.payload };
    case FETCH_BY_SEARCH:
      return { ...state, cards: action.payload };
    case FETCH_CARD:
      return { ...state, card: action.payload };
    case CREATE:
      return { ...state, cards: [...state.cards, action.payload] };
    case UPDATE:
      return {
        ...state,
        cards: state.cards.map((card) =>
          card._id === action.payload._id ? action.payload : card
        ),
      };
    case DELETE:
      return {
        ...state,
        cards: state.cards.filter((card) => card._id !== action.payload),
      };
    case COMMENT:
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card._id === action.payload._id) {
            return action.payload;
          }
          return card;
        }),
      };
    default:
      return state;
  }
};

export default reducers;
