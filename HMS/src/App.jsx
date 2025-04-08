import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";

function App() {


  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_clientId}>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar
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
