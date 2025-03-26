import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { LRwrapper } from "./components/LoginRegisterWrapper/LRwrapper.jsx";
import { AuthProtected } from "./utils/AuthProtected.jsx";
import { Dashboard } from "./components/Dashboard/Dashboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login } from "./components/Login/Login.jsx";
import { Register } from "./components/Register/Register.jsx";
import { UserDashboard } from "./components/Dashboard/UserDashboard.jsx";
import { useState } from "react";
import axios from "axios";
import { MyContext } from "./utils/ContextApi.js";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { UserPatientTable } from "./components/Table/UserPatientTable.jsx";
import { UserProfile } from "./components/Profile/UserProfile.jsx";
import { Setting } from "./components/Setting/Setting.jsx";
import { DeletePopUp } from "./components/Setting/Delete/DeletePopUp.jsx";
import { MultiStepForm } from "./components/MultiStepForm/MultiStepForm.jsx";
import { UserMain } from "./components/UserMain/UserMain.jsx";
import { ViewPatient } from "./components/ViewPatient/ViewPatient.jsx";
import { LandingPage } from "./components/LandingPage/LandingPage.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
  const [isDark, setIsDark] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const secretKey = "123456789";
  const [allPatients, setAllPatients] = useState();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
      Authorization: `${token}`,
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/user/dashboard",
      element: <ProtectedRoute isAdmin={0}> <UserDashboard /> </ProtectedRoute> ,
      children:[
        {       
                path:"",
                element: <UserMain />,
                children:[
                  {
                    path: "/user/dashboard/profile",
                    element: <UserProfile />,
                  },
                  {
                    path: "/user/dashboard/viewpatients",
                    element: <UserPatientTable />,
                  },
                  {
                    path: "/user/dashboard/viewpatients/patientdetails/:id",
                    element: <ViewPatient />,
                  },
                  {
                    path: "/user/dashboard/setting",
                    element: <Setting />,
                    children: [
                      {
                        path: "/user/dashboard/setting/deleteaccount",
                        element: <DeletePopUp />,
                      },
                    ],
                  }
                 
                ]
               }
               ,{
                path: "/user/dashboard/addpatient",
                element: <MultiStepForm />,
               }
          
        
      ]
      
    },
    {
      path: "/admin/dashboard",
      element:<ProtectedRoute isAdmin={1}> <Dashboard/> </ProtectedRoute>,
      children:[
            {
              path: "/admin/dashboard/profile",
              element:<h1>Hello Iam admin </h1>
            }
      ]
    },
    {
      path: "/account",
      element: <LRwrapper />,
      children: [
        {
          path: "/account/new/register",
          element: <Register />,
        },
        {
          path: "/account/user/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <>
      <GoogleOAuthProvider clientId="926193963649-3f55lp37bopoojo4t5m7u9eb0l13bnif.apps.googleusercontent.com">
        <MyContext.Provider
          value={{
            setToken,
            token,
            axiosInstance,
            secretKey,
            setIsAdmin,
            isAdmin,
            isDark,
            setIsDark,
            userInfo,
            setUserInfo,
            allPatients,
            setAllPatients,
          }}
        >
          <ToastContainer />
          <AuthProtected>
            <RouterProvider router={router}></RouterProvider>
          </AuthProtected>
        </MyContext.Provider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
