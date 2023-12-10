import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

//make middleware work
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

//GET all cards
export const fetchCards = () => API.get("/cards");

//GET cards by search
export const fetchCardsBySearch = (searchQuery) =>
  API.get(
    `/cards/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

//GET one card
export const fetchCard = (id) => API.get(`/cards/${id}`);

//CREATE a card
export const createCard = (newCard) => API.post("/cards", newCard);

//UPDATE a card
export const updateCard = (id, updateCard) =>
  API.patch(`/cards/${id}`, updateCard);

//DELETE a card
export const deleteCard = (id) => API.delete(`/cards/${id}`);

//LIKE a card
export const likeCard = (id) => API.patch(`/cards/${id}/likeCard`);

//BOOKMARK a card
export const bookmarkCard = (id) => API.patch(`/cards/${id}/bookmarkCard`);

//COMMENT a card
export const comment = (commentText, id) =>
  API.post(`/cards/${id}/commentCard`, { commentText });

//LOG in system
export const signIn = (formData) => API.post("/users/login", formData);

//CREATE new account
export const signUp = (formData) => API.post("/users/signup", formData);
