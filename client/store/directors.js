import axios from "axios";

const SET_DIRECTORS = "SET_DIRECTORS";
const CREATE_DIRECTOR = "CREATE_DIRECTOR";
const DESTROY_DIRECTOR = "DESTROY_DIRECTOR";
const UPDATE_DIRECTOR = "UPDATE_DIRECTOR";

const _setDirectors = (directors) => {
  return {
    type: SET_DIRECTORS,
    directors,
  };
};

const _createDirector = (director) => {
  return {
    type: CREATE_DIRECTOR,
    director,
  };
};

const _destroyDirector = (director) => {
  return {
    type: DESTROY_DIRECTOR,
    director,
  };
};

const _updateDirector = (director) => {
  return {
    type: UPDATE_DIRECTOR,
    director,
  };
};

//thunk
export const fetchDirectors = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/directors");
    dispatch(_setDirectors(data));
  };
};

export const createDirector = (director, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/directors", director);
      dispatch(_createDirector(data));
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateDirector = (director, history) => {
  return async (dispatch) => {
    try {
      console.log(director);
      const { data } = await axios.put(`/api/directors/${director.id}`, director);
      dispatch(_updateDirector(data));
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
};

export const destroyDirector = (id, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/directors/${id}`);
      dispatch(_destroyDirector({ id: id * 1 }));
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DIRECTORDIRECTORS:
      return action.directors;

    case CREATE_DIRECTOR:
      return [...state, action.director];

    case UPDATE_DIRECTOR:
      return [
        ...state,
        state.map((director) =>
        director.id === action.director.id ? action.director : director
        ),
      ];
    case DESTROY_DIRECTOR:
      return state.filter((director) => director.id !== action.director.id);

    default:
      return state;
  }
};
