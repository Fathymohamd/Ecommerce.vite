import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from "react-router-dom"
import App from './App'
import  '../App.css'
import "../src/Compoentes/i18n/i18n"
import  { store } from "./Redux/Store"
import { Provider } from "react-redux"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
      <BrowserRouter>
        <App />
          <ToastContainer position="top-right" autoClose={3000} />
   </BrowserRouter>
  </Provider>
  </StrictMode>
)

