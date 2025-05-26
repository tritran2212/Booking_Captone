import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import {BrowserRouter, RouterProvider} from "react-router";
import {Provider} from "react-redux";
import {router1} from "./router/router1.jsx";
import {store} from "./store/store.js"
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <App >
              <RouterProvider router={router1}></RouterProvider>
        </App>
    </Provider>
    
  </React.StrictMode>,
)
