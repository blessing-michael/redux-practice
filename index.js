const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

const orderCake = () => {
  return {
    type: CAKE_ORDERED,
    payload: 1
  }
}

const restockCake = (fillCake) => {
  return {
    type: CAKE_RESTOCKED,
    payload: fillCake,
  }
}

const orderIceCream = (qty=1) => {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  }
}

const restockIceCream = (qty) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  }
}

const initialCakeState = {
  numOfCake: 10,
}

const initialIceCreamState = {
  numOfIceCream: 20,
}

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCake: state.numOfCake - 1,
      }
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCake: state.numOfCake + action.payload,
      }
    default:
      return state;
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - action.payload,
      }
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream + action.payload,
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log('initial state', store.getState());

const unsubscribe = store.subscribe(() => {});

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// const fillCake = initialState.numOfCake - store.getState().numOfCake;

// store.dispatch(restockCake(fillCake));

const action = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch);
action.orderCake();
action.orderCake();
action.orderCake();

action.restockCake(3);

action.orderIceCream();
action.orderIceCream();
action.orderIceCream();
action.orderIceCream();

action.restockIceCream(4);


unsubscribe();
