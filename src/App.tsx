import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/homepage/Homepage";
import InfoPage from "./Pages/info/infopage";
// import './App.css'

function App() {
  const routers = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/info/:id", element: <InfoPage /> },
  ]);

  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
