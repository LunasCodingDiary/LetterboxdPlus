import axios from "axios";

const SET_SINGLE_FILM = "SET_SINGLE_FILM";

//Action Creator...
const setSingleFilm = (film) => {
  return {
    type: SET_SINGLE_FILM,
    film,
  };
};

//Thunk...
export const fetchSingleFilm = (filmId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/films/${filmId}`);
      dispatch(setSingleFilm(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//Reducer Function...
const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_FILM:
      return action.film;
    default:
      return state;
  }
};
