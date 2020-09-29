import React, {Component} from 'react';
import Main from './components/MainComponent';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'; //Redux store becomes available to all component in the application
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore();


class App extends Component {
  //in order to store the state, you need to define the state in the constructor of the class component
 


  render() {
    return (
      <Provider store = {store}>
      <BrowserRouter>
        <div>
          <Main/>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;


