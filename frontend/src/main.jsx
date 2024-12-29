import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import {store} from './redux/store.js'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
