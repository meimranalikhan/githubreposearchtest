import * as types from "../actions/app"

const initialState = {
    loader: false
}

export default function repositorysearcher(state = initialState, actions) {
    switch(actions.type){
        case types.SETLOADER:
            return {
                loader: actions.loading
            }
        default:
            return {
                ...state
            }
    }
}