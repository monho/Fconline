import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Default from "./components/Default";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Default />
        </>
      ),
      children: [],
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
