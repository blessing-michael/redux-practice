const redux = require('redux');
const applyMiddleWare = redux.applyMiddleware;
const thunkMiddleWare = require('redux-thunk').default;
const axios = require('axios');

const initialState = {
  loading: false,
  users: [],
  error: '',
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  }
}
const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  }
}
const fetchUsersFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      }
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: '',
      }
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      }
  }
}

const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest())
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      const users = response.data.map((user) => user);
      dispatch(fetchUsersSuccess(users));
      
    }).catch(error => {
      dispatch(fetchUsersFailed(error.message))
    })
  }
}

const store = redux.createStore(reducer, applyMiddleWare(thunkMiddleWare));

store.subscribe(() => {
  console.log(store.getState())
})
store.dispatch(fetchUsers())