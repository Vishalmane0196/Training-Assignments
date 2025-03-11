import React from 'react';
import Layout from './components/Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashBoard from './components/DashBoard/DashBoard';
import Form from './components/Form/Form'
import DisplayTodo from './components/DisplayTodo/DisplayTodo';
import FormListCover from './components/FormListCover/FormListCover';
import { createContext } from 'react';
import { useState } from 'react';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

let Data = createContext(null);
function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') || false);
  const [token , settoken] = useState(localStorage.getItem('token') || '');
 
  const client = axios.create({
    baseURL: "http://localhost:5000/api" ,
    headers: {
      'Authorization': `${token}`
    }
  });

  

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Layout />,
        children:
          [
            {
              path: '/',
              element:  <DashBoard /> 
            },
            {
              path: '/register',
              element:<Register/>,
            },
            {
                path: '/login',
                element:<Login/>,
            },
            {
              path: '/user/addtodo',
              element: <FormListCover />,
              children: [
                {
                  path: '',
                  element: <Form />
                }
                ,
              ]
            },
            {
              path: '/user/display',
              element: <FormListCover />,
              children: [
                {
                  path:'',
                  element: <DisplayTodo />,
                  children:[
                    {
                      path:'',
                      element: <DisplayTodo />
                    },
                    {
                      path:'/user/display/completed',
                      element: <DisplayTodo />
                    }
                  ]
                }
                ,
              ]
            }
          ]

      }
    ]
  )


  return (
    <>
      
      <Data.Provider value={ {isLogin,client,setIsLogin,settoken}}>
      <ToastContainer/>
        <RouterProvider router={router} />
      </Data.Provider>

    </>
  )
}

export default App

export {Data}
