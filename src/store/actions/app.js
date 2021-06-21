
export const SETLOADER = "SETLOADER";

export const setLoader = (value) => {
    return dispatch => {
        dispatch({ type: SETLOADER, loading: value });
    }
}
