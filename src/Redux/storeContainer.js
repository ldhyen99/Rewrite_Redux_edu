import React from 'react';
import store from './createStore';

function subscriber(currentState, previousState) {
  this.setState(currentState);
}

export default function StoreContainer(Component, reducers) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      // We have to call this to create the initial React
      // component and get a `this` value to work with
      this.state = { ...store.getState(), currentState: '' };
    }

    componentWillMount() {
      this.instSubscriber = subscriber.bind(this);
      store.subscribe(this.instSubscriber);
      store.addReducers(reducers);
    }

    UNSAFE_componentWillMount() {
      store.unsubscribe(this.instSubscriber);
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };
}
