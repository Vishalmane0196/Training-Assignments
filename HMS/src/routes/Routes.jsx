import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "src/routes/ProtectedRoute.jsx";
import { Loading } from "src/components/Loading/Loading";
import ErrorBoundary from "src/components/ErrorBoundary/ErrorBoundary";
import { RoleBasedRoute } from "./RoleBasedRoute";

const delayForDemo = (promise, time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(promise), time);
  });
};

const Prescription = lazy(() => import("src/pages/Prescription/Prescription"));
const UpdateAdmin = lazy(() => import("src/pages/AdminSetting/UpdateAdmin"));
const Appointment = lazy(() => import("src/pages/Appointment/Appointment"));
const LRwrapper = lazy(() =>
  import("src/components/LoginRegisterWrapper/LRwrapper.jsx")
);
const Login = lazy(() => delayForDemo(import("src/pages/Login/Login.jsx")));
const Register = lazy(() => import("src/pages/Register/Register.jsx"));
const UserPatientTable = lazy(() =>
  import("src/pages/Table/UserPatientTable.jsx")
);
const Setting = lazy(() => import("src/components/Setting/Setting.jsx"));
const MultiStepForm = lazy(() =>
  import("src/components/MultiStepForm/MultiStepForm.jsx")
);
const ViewPatient = lazy(() => import("src/pages/ViewPatient/ViewPatient"));
const LandingPage = lazy(() => import("src/pages/LandingPage/LandingPage"));
const Summary = lazy(() => import("src/pages/Summary/Summary.jsx"));
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
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <ProtectedRoute></ProtectedRoute>
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      {
        path: "/profile",
        element: (
          <RoleBasedRoute
            element={<Profile />}
            role={["admin", "user", "doctor"]}
          />
        ),
      },
      {
        path: "/viewpatients",
        element: (
          <RoleBasedRoute
            element={<UserPatientTable />}
            role={["user", "doctor"]}
          />
        ),
      },
      {
        path: "/viewpatients/patientdetails/:id",
        element: <ViewPatient />,
      },

      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/addpatient",
        element: (
          <Suspense fallback={<Loading />}>
            <MultiStepForm />
          </Suspense>
        ),
      },
      {
        path: "/viewpatients/bookAppointment",
        element: <Appointment />,
      },
      {
        path: "/setting/accessControl",
        element: (
          <RoleBasedRoute
            element={<UpdateAdmin access={"Admin"} />}
            role={["admin"]}
          />
        ),
      },
      {
        path: "/manageDoctor",
        element: (
          <RoleBasedRoute
            element={<UpdateAdmin access={"doctor"} />}
            role={["admin"]}
          />
        ),
      },
      {
        path: "/manageAppointment",
        element: (
          <RoleBasedRoute
            element={<AdminPatient access={"appointment"} />}
            role={["admin"]}
          />
        ),
      },
      {
        path: "/allpatients",
        element: <RoleBasedRoute element={<Summary />} role={["admin"]} />,
      },
      {
        path: "/allpatients/patientdetails/:id",
        element: <RoleBasedRoute element={<Allpatient />} role={["admin"]} />,
        children: [
          {
            path: "",
            element: <ViewPatient />,
          },
        ],
      },
      {
        path: "/mypatients/patientdetails/:id",
        element: <RoleBasedRoute element={<Allpatient />} role={["admin"]} />,
        children: [
          {
            path: "",
            element: <ViewPatient />,
          },
        ],
      },
      {
        path: "/mypatients/viewpatients/bookAppointment",
        element: <RoleBasedRoute element={<Appointment />} role={["admin"]} />,
      },
      {
        path: "/mypatients",
        element: (
          <RoleBasedRoute
            element={<AdminPatient access={""} />}
            role={["admin"]}
          />
        ),
      },
      {
        path: "/appointment/prescription",
        element: (
          <RoleBasedRoute element={<Prescription />} role={["doctor"]} />
        ),
      },
      {
        path: "/appointment",
        element: (
          <RoleBasedRoute
            role={["doctor"]}
            element={<UserPatientTable access={"doctor"} />}
          />
        ),
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
        path: "/account/forget/:email",
        element: <Forget />,
      },
    ],
  },
]);

export default Router;
