import React from 'react'
import { Provider } from 'react-redux'
import AppRoutes from './routes/AppRoutes.jsx'
import store from './store/store.js'

import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'


function App() {

  return (
    <Provider store={store}>
      <AppRoutes />
      <ToastContainer />
    </Provider>
  )
}

export default App