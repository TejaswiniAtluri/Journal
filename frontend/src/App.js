import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Components/RootLayout/RootLayout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import MyJournal from "./Components/MyJournal/MyJournal";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "journal", element: <MyJournal /> },
      ],
    },
  ]);
  return (
    <div className="App text-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
