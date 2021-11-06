import axios from "axios";

const SET_SINGLE_DIRECTOR = "SET_SINGLE_DIRECTOR";

//Action Creator...
const setSingleDirector = (director) => {
  return {
    type: SET_SINGLE_DIRECTOR,
    director,
  };
};

//Thunk...
export const fetchSingleDirector = (directorId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/directors/${directorId}`);
      dispatch(setSingleDirector(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//Reducer Function...
const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_DIRECTOR:
      return action.director;
    default:
      return state;
  }
};
