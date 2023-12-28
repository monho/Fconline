import React from "react";
import {
  Switch ,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Default from "./components/Default";
import UserInfo from "./components/content/UserInfo";
import SearchForm from "./components/header/SearchForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <UserInfo />
        </>
      ),
      children: [],
    },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/userinfo" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}
export default App;
