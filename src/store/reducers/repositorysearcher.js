import * as types from "../actions/repositorysearcher"

const initialState = {
    result: [],
    sortedResult: [],
    currentRepoIssues: []
}

export default function repositorysearcher(state = initialState, actions) {
    switch(actions.type){
        case types.LOADSEARCH:
            return {
                ...state,
                result: actions.result,
                sortedResult: actions.result
            }
        case types.SETSORTING:
            return {
                ...state,
                sortedResult: actions.sortedResult
            }
        case types.SETREPOISSUES:
            return {
                ...state,
                currentRepoIssues: actions.currentRepoIssues
            }
        default:
            return {
                ...state
            }
    }
}