import axios from 'axios'
import history from '../history'

///////////// CONSTANT //////////////////////
const TOKEN = 'token'

/////////////// ACTION TYPES /////////////
const FETCH_WATCHLIST = 'FETCH_USER_WATCHLIST'
const ADD_TO_WATCHLIST = 'ADD_TO_WATCHLIST'
///////////////// ACTION CREATORS /////////////////
const setWatchlist = entries => {
    return {
        type: FETCH_WATCHLIST, entries
    }
}
const _addToWatchlist = entry => {
    return {
        type: ADD_TO_WATCHLIST, entry
    }
}
///////////////////// THUNK CREATORS //////////////////
export const fetchWatchlist= () => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.get('/api/entries/watchlist', {
            headers: {
                authorization: token
            }
        })
        return dispatch(setWatchlist(data))
    }
}

export const addToWatchlist = (entryInfo) => async dispatch => {
    // const token = window.localStorage.getItem(TOKEN)
    // if (token) {
        const { data } = await axios.post('/api/entries', entryInfo)
        dispatch(_addToWatchlist(data))
        //window.location.href = data
}

////////////////// REDUCER ////////////////////
const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_WATCHLIST:
            return action.entries
        case ADD_TO_WATCHLIST:
            return [...state, action.entry];
        default:
            return state
    }
}


//to be added: update+destroy