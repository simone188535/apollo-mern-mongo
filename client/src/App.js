import React, { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Edit from './pages/Edit';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchResults from './pages/SearchResults';
import Vinyl from './pages/Vinyl';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [easterEgg, setEasterEgg] = useState(false)

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header setEasterEgg={setEasterEgg} />
          <div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/me">
                <Profile />
              </Route>
              <Route exact path="/users/:id">
                <Profile />
              </Route>
              <Route exact path="/upload">
                <Upload />
              </Route>
              <Route exact path="/results">

                <SearchResults easterEgg={easterEgg} setEasterEgg={setEasterEgg} />
              </Route>
              <Route exact path="/vinyl/:title">
                <Vinyl />
              </Route>
              <Route exact path="/edit">
                <Edit />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
