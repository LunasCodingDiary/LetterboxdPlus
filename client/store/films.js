import axios from "axios";

const TOKEN = "token";

const SET_FILMS = "SET_FILMS";
const CREATE_FILM = "CREATE_FILM";
const DESTROY_FILM = "DESTROY_FILM";
const UPDATE_FILM = "UPDATE_FILM";

const _setFilms = (films) => {
  return {
    type: SET_FILMS,
    films,
  };
};

const _createFilm = (film) => {
  return {
    type: CREATE_FILM,
    film,
  };
};

const _destroyFilm = (Film) => {
  return {
    type: DESTROY_FILM,
    film,
  };
};

const _updateFilm = (film) => {
  return {
    type: UPDATE_FILM,
    film,
  };
};

///////////////////// THUNK CREATOR ///////////////////////
export const fetchFilms = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/films");
    dispatch(_setFilms(data));
  };
};

export const createFilm = (FilmInfo, history) => {
  return async (dispatch) => {
    console.log(FilmInfo);
    try {
      const { data } = await axios.post("/api/Films", FilmInfo);
      dispatch(_createFilm(data));
      history.push("/admin/Films");
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateFilm = (filmInfo) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/films/${filmInfo.id}`,
        filmInfo
      );
      dispatch(_updateFilm(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const destroyFilm = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      await axios.delete(`/api/films/${id}`, {
        headers: { authorization: token },
      });
      dispatch(_destroyFilm({ id: id * 1 }));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILMS:
      return action.films;
    case CREATE_FILM:
      return [...state, action.film];

    case UPDATE_FILM:
      return [
        ...state,
        state.map((film) =>
          film.id === action.film.id ? action.film : film
        ),
      ];
    case DESTROY_FILM:
      return state.filter((film) => film.id !== action.film.id);
    default:
      return state;
  }
};
