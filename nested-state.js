const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const produce = require('immer').produce;

const initialState = {
  name: 'Shakil Khan',
  address: {
    street: '123 Main St',
    city: 'Boston',
    state: 'MA',
  },
}

const STREET_UPDATED = 'STREET_UPDATED';

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload,
      //   },
      // }
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state; 
  }
}

const store = redux.createStore(reducer);
console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() => console.log("Updated State", store.getState()));

const action = bindActionCreators({ updateStreet }, store.dispatch);

action.updateStreet('456 Main St');
action.updateStreet('789 Main St');
action.updateStreet('011 Main St');

unsubscribe();