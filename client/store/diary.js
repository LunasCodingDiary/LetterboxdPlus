import axios from 'axios'
import history from '../history'

///////////// CONSTANT //////////////////////
const TOKEN = 'token'

/////////////// ACTION TYPES /////////////
const FETCH_DIARY = 'FETCH_USER_DIARY'
const ADD_TO_DIARY = 'ADD_TO_DIARY'
///////////////// ACTION CREATORS /////////////////
const setDiary = entries => {
    return {
        type: FETCH_DIARY, entries
    }
}
const _addToDiary = entry => {
    return {
        type: ADD_TO_DIARY, entry
    }
}
///////////////////// THUNK CREATORS //////////////////
export const fetchDiary= () => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.get('/api/entries/diary', {
            headers: {
                authorization: token
            }
        })
        return dispatch(setDiary(data))
    }
}

export const addToDiary = (entryInfo) => async dispatch => {
    // const token = window.localStorage.getItem(TOKEN)
    // if (token) {
        const { data } = await axios.post('/api/entries', entryInfo)
        dispatch(_addToDiary(data))
        //window.location.href = data
}

////////////////// REDUCER ////////////////////
const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_DIARY:
            return action.entries
        case ADD_TO_DIARY:
            return [...state, action.entry];
        default:
            return state
    }
}


//to be added: update+destroy