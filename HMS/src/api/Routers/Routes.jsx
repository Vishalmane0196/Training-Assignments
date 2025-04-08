import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "src/components/ProtectedRoute/ProtectedRoute.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const module = await import("../../pages/LandingPage/LandingPage.jsx");
      return { Component: module.LandingPage };
    },
  },
  {
    path: "/user/dashboard",
    lazy: async () => {
      const module = await import("src/pages/Dashboard/UserDashboard.jsx");
      return {
        Component: () => (
          <ProtectedRoute>
            <module.UserDashboard />
          </ProtectedRoute>
        )
      };
    },
    children: [
      {
        path: "",
        lazy: async () => {
          const module = await import("src/pages/UserMain/UserMain.jsx");
          return { Component: module.UserMain };
        },
        children: [
          {
            path: "/user/dashboard/profile",
            lazy: async () => {
              const module = await import("src/components/Profile/UserProfile.jsx");
              return { Component: module.UserProfile };
            },
          },
          {
            path: "/user/dashboard/viewpatients",
            lazy: async () => {
              const module = await import("src/pages/Table/UserPatientTable.jsx");
              return { Component: module.UserPatientTable };
            },
          },
          {
            path: "/user/dashboard/viewpatients/patientdetails/:id",
            lazy: async () => {
              const module = await import("src/pages/ViewPatient/ViewPatient.jsx");
              return { Component: module.ViewPatient };
            },
          },
          {
            path: "/user/dashboard/setting",
            lazy: async () => {
              const module = await import("src/components/Setting/Setting.jsx");
              return { Component: module.Setting };
            },
            children: [
              {
                path: "/user/dashboard/setting/deleteaccount",
                lazy: async () => {
                  const module = await import("src/components/Setting/Delete/DeletePopUp.jsx");
                  return { Component: module.DeletePopUp };
                },
              },
            ],
          },
        ],
      },
      {
        path: "/user/dashboard/addpatient",
        lazy: async () => {
          const module = await import("src/components/MultiStepForm/MultiStepForm.jsx");
          return { Component: module.MultiStepForm };
        },
      },
    ],
  },
  {
    path: "/admin/dashboard",
    lazy: async () => {
      const module = await import("src/pages/Dashboard/Dashboard.jsx");
      return {
        Component: () => (
          <ProtectedRoute isAdminProp>
            <module.Dashboard />
          </ProtectedRoute>
        )
      };
    },
    children: [
      {
        path: "/admin/dashboard/profile",
        lazy: async () => {
          const module = await import("src/components/Profile/AdminProgile.jsx");
          return { Component: module.AdminProgile };
        },
      },
      {
        path: "/admin/dashboard/setting",
        lazy: async () => {
          const module = await import("src/components/Setting/AdminSetting.jsx");
          return { Component: module.AdminSetting };
        },
      },
      {
        path: "/admin/dashboard/allpatients",
        lazy: async () => {
          const module = await import("src/pages/Summary/Summary.jsx");
          return { Component: module.Summary };
        },
      },
      {
        path: "/admin/dashboard/allpatients/patientdetails/:id",
        lazy: async () => {
          const module = await import("src/pages/AllPatient/Allpatient.jsx");
          return { Component: module.Allpatient };
        },
        children: [
          {
            path: "",
            lazy: async () => {
              const module = await import("src/pages/ViewPatient/ViewPatient.jsx");
              return { Component: module.ViewPatient };
            },
          },
        ],
      },
      {
        path: "/admin/dashboard/addpatient",
        lazy: async () => {
          const module = await import("src/components/MultiStepForm/MultiStepForm.jsx");
          return { Component: module.MultiStepForm };
        },
      },
      {
        path: "/admin/dashboard/mypatients",
        lazy: async () => {
          const module = await import("src/pages/AdminPatient/AdminPatient.jsx");
          return { Component: module.AdminPatient };
        },
      },
    ],
  },
  {
    path: "/account",
    lazy: async () => {
      const module = await import("src/components/LoginRegisterWrapper/LRwrapper.jsx");
      return { Component: module.LRwrapper };
    },
    children: [
      {
        path: "/account/new/register",
        lazy: async () => {
          const module = await import("src/pages/Register/Register.jsx");
          return { Component: module.Register };
        },
      },
      {
        path: "/account/user/login",
        lazy: async () => {
          const module = await import("src/pages/Login/Login.jsx");
          return { Component: module.Login };
        },
      },
      {
        path: "/account/forget",
        lazy: async () => {
          const module = await import("src/pages/Forget/Forget.jsx");
          return { Component: module.Forget };
        },
      },
    ],
  },
]);

export default Router;
