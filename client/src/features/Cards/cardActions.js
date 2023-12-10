import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  FETCH_CARD,
  COMMENT,
} from "./cardConstants";
import * as api from "../../api";

export const getCards = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCards();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCardsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.fetchCardsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCard = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchCard(id);
    dispatch({ type: FETCH_CARD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCard = (card) => async (dispatch) => {
  try {
    const { data } = await api.createCard(card);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCard = (id, card) => async (dispatch) => {
  try {
    const { data } = await api.updateCard(id, card);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likeCard = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeCard(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const bookmarkCard = (id) => async (dispatch) => {
  try {
    const { data } = await api.bookmarkCard(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCard = (id) => async (dispatch) => {
  try {
    await api.deleteCard(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const commentCard = (commentText, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(commentText, id);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
