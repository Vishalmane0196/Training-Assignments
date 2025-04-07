import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { LRwrapper } from "./components/LoginRegisterWrapper/LRwrapper.jsx";

import { Dashboard } from "./pages/Dashboard/Dashboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login } from "./pages/Login/Login.jsx";
import { Register } from "./pages/Register/Register.jsx";
import { UserDashboard } from "./pages/Dashboard/UserDashboard.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { UserPatientTable } from "./pages/Table/UserPatientTable.jsx";
import { UserProfile } from "./components/Profile/UserProfile.jsx";
import { Setting } from "./components/Setting/Setting.jsx";
import { DeletePopUp } from "./components/Setting/Delete/DeletePopUp.jsx";
import { MultiStepForm } from "./components/MultiStepForm/MultiStepForm.jsx";
import { UserMain } from "./pages/UserMain/UserMain.jsx";
import { ViewPatient } from "./pages/ViewPatient/ViewPatient.jsx";
import { LandingPage } from "./pages/LandingPage/LandingPage.jsx";
import { Summary } from "./pages/Summary/Summary.jsx";
import { AdminSetting } from "./components/Setting/AdminSetting.jsx";
import { AdminProgile } from "./components/Profile/AdminProgile.jsx";
import { Allpatient } from "./pages/AllPatient/Allpatient.jsx";
import { AdminPatient } from "./pages/AdminPatient/AdminPatient.jsx";
import { Forget } from "./pages/Forget/Forget.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/user/dashboard",
      element: (
        <ProtectedRoute isAdminProp={0}>
          {" "}
          <UserDashboard />{" "}
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <UserMain />,
          children: [
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
            },
          ],
        },
        {
          path: "/user/dashboard/addpatient",
          element: <MultiStepForm />,
        },
      ],
    },
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute isAdminProp={1}>
          {" "}
          <Dashboard />{" "}
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/admin/dashboard/profile",
          element: <AdminProgile />,
        },
        {
          path: "/admin/dashboard/setting",
          element: <AdminSetting />,
        },
        {
          path: "/admin/dashboard/allpatients",
          element: <Summary />,
        },
        {
          path: "/admin/dashboard/allpatients/patientdetails/:id",
          element: <Allpatient />,
          children: [
            {
              path: "",
              element: <ViewPatient />,
            },
          ],
        },
        {
          path: "/admin/dashboard/addpatient",
          element: <MultiStepForm />,
        },
        {
          path: "/admin/dashboard/mypatients",
          element: <AdminPatient />,
        },
      ],
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
        {
          path: "/account/forget",
          element: <Forget />,
        },
      ],
    },
  ]);

  return (
    <>
      <GoogleOAuthProvider clientId="926193963649-3f55lp37bopoojo4t5m7u9eb0l13bnif.apps.googleusercontent.com">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" 
          
        />

        <RouterProvider router={router}></RouterProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
