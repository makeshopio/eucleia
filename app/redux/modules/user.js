export const USER_INVALID = 'USER_INVALID';
export const USER_FETCHING = 'USER_FETCHING';
export const USER_FETCHED = 'USER_FETCHED';
export const USER_FETCH_FAILED = 'USER_FETCH_FAILED';

export default function user(state = {}, action) {
  switch (action.type) {
    case USER_FETCHING:
      return Object.assign({}, state, {
        [action.userId]: {
          status: USER_FETCHING
        }
      });
    case USER_FETCH_FAILED:
      return Object.assign({}, state, {
        [action.userId]: {
          status: USER_FETCH_FAILED,
          error: action.error
        }
      });
    case USER_FETCHED:
      return Object.assign({}, state, {
        [action.userId]: {
          status: USER_FETCHED,
          info: action.result
        }
      });
    default:
      return state;
  }
}

function fetchUser(userId) {
  return (dispatch) => {
    dispatch({ type: USER_FETCHING, userId: userId });

    return fetch('http://jsonplaceholder.typicode.com/users/' + userId)
      .then((response) => {
        return response.json();
      })
      .then(
        (result) => dispatch({ type: USER_FETCHED, userId: userId, result }),
        (error) => dispatch({ type: USER_FETCH_FAILED, userId: userId, error })
      );
  }
}

function shouldFetchUser(state, userId) {
  const user = state.user[userId];

  if (!user ||
    user.status === USER_FETCH_FAILED ||
    user.status === USER_INVALID) {
    return true;
  }

  return false;
}

export function fetchUserIfNeeded(userId) {
  return (dispatch, getState) => {
    if (shouldFetchUser(getState(), userId)) {
      return dispatch(fetchUser(userId));
    }
  }
}
