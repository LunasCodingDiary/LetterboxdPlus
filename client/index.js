import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import store from './store'
import App from './App'
import history from './history'

ReactDOM.render(

   <Provider store={store}>
   {/* <HashRouter history={history}>*/}
        <App />
    {/* </HashRouter> */}
   </Provider>,
  document.getElementById('app')
)
