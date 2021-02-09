import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'babel-polyfill';
import AddContact from '../contact/AddContact';
import Contacts from '../contact/Contacts';
import Header from '../layout/Header';
import EditContact from '../contact/EditContact';
import About from '../Pages/About';
import NotFound from '../Pages/NotFound';

import '../style/style.css';

const App = () => (
  <div className='container'>
    <Header />
    <Switch>
      <Route path='/' exact component={Contacts} />
      <Route path='/add' component={AddContact} />
      <Route path='/edit/:id' component={EditContact} />
      <Route path='/about' exact component={About} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
