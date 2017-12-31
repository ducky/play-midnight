import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';

import { rootReducer, rootSaga } from 'modules/root';

const DEV = process.env.NODE_ENV === 'development';

/*
* Middleware & enhancers
*/
const middleware = [];

// middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

// middleware: Redux Logger
if (DEV) middleware.push(createLogger({ collapsed: true }));

const enhancers = [];

// enhancer: middleware chain
enhancers.push(applyMiddleware(...middleware));

// enhancer: Redux DevTools
if (DEV) {
  enhancers.push(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
}

// export the created store
const store = createStore(rootReducer, compose(...enhancers));

// run the root saga
sagaMiddleware.run(rootSaga);

export default store;
