import { Octokit } from "@octokit/core";
import { setLoader } from "./app";

const octokit = new Octokit();

export const LOADSEARCH = "LOADSEARCH";
export const SETSORTING = "SETSORTING";
export const SETREPOISSUES = "SETREPISSUES";

export const loadResults = (searchWords) => {
    return async dispatch => {
        dispatch(setLoader(true));
        await octokit.request('GET /search/repositories', {
            q: searchWords
        })
            .then(result => {
                dispatch({ type: LOADSEARCH, result: result.data.items });
                console.log(result.data.items);
                dispatch(setLoader(false));
            })
            .catch(e => {
                dispatch(setLoader(false));
            });
        
    }
}

export const loadIssues = (issueApi) => {
    return dispatch => {
        octokit.request(issueApi.replace("{/number}", ""))
            .then(result => {
                var newData = result.data.sort((a, b) => a.comments > b.comments && 1 || -1);
                dispatch({ type: SETREPOISSUES, currentRepoIssues: newData })
            })
            .catch(e => {
                console.log(e)
            });
    }
}

export const sortBestMatch = () => {
    return (dispatch, getState) => {
        var result = getState().repositorysearcher.result;
        dispatch({ type: SETSORTING, sortedResult: result });
    }
}

export const sortStarred = () => {
    return (dispatch, getState) => {
        var result = JSON.parse(JSON.stringify(getState().repositorysearcher.result));
        var newSortedResult = result.sort((a, b) => a.stargazers_count < b.stargazers_count && 1 || -1);
        dispatch({ type: SETSORTING, sortedResult: newSortedResult });
    }
}

export const sortForked = () => {
    return (dispatch, getState) => {
        var result = JSON.parse(JSON.stringify(getState().repositorysearcher.result));
        var newForkedResult = result.sort((a, b) => a.forks < b.forks && 1 || -1);
        dispatch({ type: SETSORTING, sortedResult: newForkedResult });
    }
}
