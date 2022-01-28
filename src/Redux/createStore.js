var _ = require('lodash');
var store;

function getInstance() {
  if (!store) store = createStore();
  console.log({ store });

  return store;
}

const validateAction = (action) => {
  if (!action || typeof action !== 'object' || Array.isArray(action)) {
    throw new Error('Action must be an object!');
  }
  if (typeof action.type === 'undefined') {
    throw new Error('Action must have a type!');
  }
};

function createStore() {
  var currentState = {};
  var subscribers = [];
  var currentReducerSet = {};

  var currentReducer = function (state, action) {
    return state;
  };

  function dispatch(action) {
    validateAction(action);
    var prevState = currentState;
    currentState = currentReducer(_.cloneDeep(currentState), action);
    subscribers.forEach(function (subscriber) {
      subscriber(currentState, prevState);
    });
  }

  function addReducers(reducers) {
    currentReducerSet = Object.assign(currentReducerSet, reducers);
    currentReducer = function (state, action) {
      var cumulativeState = {};
      for (let key in currentReducerSet) {
        cumulativeState[key] = currentReducerSet[key](state[key], action);
      }

      return cumulativeState;
    };
  }

  function subscribe(fn) {
    subscribers.push(fn);
  }

  function unsubscribe(fn) {
    subscribers.splice(subscribers.indexOf(fn), 1);
  }

  function getState() {
    return _.cloneDeep(currentState);
  }

  return {
    addReducers: addReducers,
    dispatch: dispatch,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    getState: getState,
  };
}

module.exports = getInstance();
