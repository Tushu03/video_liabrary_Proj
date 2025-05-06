
import { createRoot } from 'react-dom/client'
import './index.css'

import { CookiesProvider } from 'react-cookie';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { Index } from './components/index.tsx';
import { Provider } from 'react-redux';
import store from './store/store.tsx';
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"


createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <Provider store={store}>
      <Index />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // "light", "dark", or "colored"
        style={{ width: "350px", fontSize: "16px" }} // inline styling here

      />

    </Provider>


  </CookiesProvider>
)
