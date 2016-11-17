import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

export default
function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(
      thunkMiddleware
    )
  );

  // Check if hot reloading is enabled in Webpack
  if (module.hot) {
    // Accept and hot load changes to reducers
    module.hot.accept('./reducers', () => {
      const newReducers = require('./reducers').default;
      store.replaceReducer(newReducers);
    });
  }

  return store;
};
