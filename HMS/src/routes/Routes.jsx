import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "src/routes/ProtectedRoute.jsx";
import { Loading } from "src/components/Loading/Loading";
import ErrorBoundary from "src/components/ErrorBoundary/ErrorBoundary";

const delayForDemo = (promise, time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(promise), time);
  });
};

const UpdateAdmin = lazy(() => import("src/pages/AdminSetting/UpdateAdmin"));
const Appointment = lazy(() => import("src/pages/Appointment/Appointment"));
const LRwrapper = lazy(() =>
  import("src/components/LoginRegisterWrapper/LRwrapper.jsx")
);
const Dashboard = lazy(() => import("src/pages/Dashboard/Dashboard.jsx"));
const Login = lazy(() => delayForDemo(import("src/pages/Login/Login.jsx")));
const Register = lazy(() => import("src/pages/Register/Register.jsx"));
const UserDashboard = lazy(() =>
  import("src/pages/Dashboard/UserDashboard.jsx")
);
const UserPatientTable = lazy(() =>
  import("src/pages/Table/UserPatientTable.jsx")
);

const Setting = lazy(() => import("src/components/Setting/Setting.jsx"));
const DeletePopUp = lazy(() =>
  import("src/components/Setting/Delete/DeletePopUp.jsx")
);
const MultiStepForm = lazy(() =>
  import("src/components/MultiStepForm/MultiStepForm.jsx")
);
const UserMain = lazy(() => import("src/pages/UserMain/UserMain.jsx"));
const ViewPatient = lazy(() => import("src/pages/ViewPatient/ViewPatient"));
const LandingPage = lazy(() => import("src/pages/LandingPage/LandingPage"));
const Summary = lazy(() => import("src/pages/Summary/Summary.jsx"));
const AdminSetting = lazy(() =>
  import("src/components/Setting/AdminSetting.jsx")
);
const Profile = lazy(() => import("src/components/Profile/Profile.jsx"));
const Allpatient = lazy(() => import("src/pages/AllPatient/Allpatient.jsx"));
const AdminPatient = lazy(() =>
  import("src/pages/AdminPatient/AdminPatient.jsx")
);
const Forget = lazy(() => import("src/pages/Forget/Forget.jsx"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/user/dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute isAdminProp={0}>
          <ErrorBoundary>
            <UserDashboard />
          </ErrorBoundary>
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loading />}>
            <UserMain />
          </Suspense>
        ),
        children: [
          {
            path: "/user/dashboard/profile",
            element: <Profile />,
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
        element: (
          <Suspense fallback={<Loading />}>
            <MultiStepForm />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/viewpatients/bookAppointment",
        element: <Appointment />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute isAdminProp={1}>
          <ErrorBoundary>
            {" "}
            <Dashboard />
          </ErrorBoundary>
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        path: "/admin/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/admin/dashboard/setting",
        element: <AdminSetting />,
      },
      {
        path: "/admin/dashboard/setting/accessControl",
        element: <UpdateAdmin access={"Admin"} />,
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
        path: "/admin/dashboard/manageDoctor",
        element: <UpdateAdmin access={"doctor"} />,
      },
      {
        path: "/admin/dashboard/manageAppointment",
        element: <AdminPatient access={"appointment"} />,
      },
      {
        path: "/admin/dashboard/viewpatients/bookAppointment",
        element: <Appointment />,
      },
      {
        path: "/admin/dashboard/addpatient",
        element: <MultiStepForm />,
      },
      {
        path: "/admin/dashboard/mypatients",
        element: <AdminPatient access={""} />,
      },
    ],
  },
  {
    path: "/account",
    element: (
      <Suspense fallback={<Loading />}>
        <LRwrapper />
      </Suspense>
    ),
    children: [
      {
        path: "/account/new/register",
        element: <Register />,
      },
      {
        path: "/account/user/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/account/forget",
        element: <Forget />,
      },
    ],
  },
]);

export default Router;
