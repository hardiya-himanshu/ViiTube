// Importing VDOM, Redux&Store, React-Router-Dom&Router
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Importing Global Styles
import './index.css'

// Importing Components and Elements
import App from './App.jsx'
import Home from './components/pages/Home.jsx'
import Login from './components/pages/Login.jsx'
import Signup from './components/pages/Signup.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
          path: "/login",
          element:<Login />
      },
      {
          path: "/signup",
          element:<Signup />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
