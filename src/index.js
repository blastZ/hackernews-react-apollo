import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import 'regenerator-runtime/runtime' //support generator api
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './scripts/App';
import rootReducer from './scripts/reducers';
import './index.css';
import rootSaga from './scripts/sagas';
import { ApolloLink } from 'apollo-link';
import { AUTH_TOKEN } from './constants';

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation);
});

const httpLink = new HttpLink({uri: 'http://localhost:4000'});
const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);
const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache()
})

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, (process.env.NODE_ENV === 'development'
  ? composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
  : compose(
    applyMiddleware(sagaMiddleware)
  )
));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </Provider>, document.getElementById('app'));