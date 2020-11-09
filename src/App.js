import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import ProductList from './components/product-list/product-list.component';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ThunkMiddleware from 'redux-thunk';
import rootReducer  from './reducers/rootReducer';
import ProductDetails from './components/product-details/product-details.component';
import Header from './components/header/header.component';
import CartPage from './components/cart-page/cart-page.component'

export const  store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <div className="App">
            <Switch>
              <Route exact path={'/'} render={() => {
                return <Redirect to={'/products'}/>
              }}/>
              <Route exact path={'/products'} component={ProductList}/>
              <Route path="/products/:id?" component={ProductDetails}/>
              <Route path="/cart" component={CartPage}/>
              <Route path="*" render={()=><div>Uh Oh!!! You lost?</div>}/>
            </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
