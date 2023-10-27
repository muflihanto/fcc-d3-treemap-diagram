import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import VideoGame from "./Diagram";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <VideoGame />,
      },
    ],
  },
]);

function Root() {
  return (
    <div className="container mx-auto py-8">
      <nav>
        <ul className="flex items-center justify-center [&>li]:px-3 [&_a:hover]:underline text-sky-600 font-semibold divide-x divide-black">
          <li>
            <Link to={{ pathname: "/", search: "?data=videogames" }}>Video Game Data Set</Link>
          </li>
          <li>
            <Link to={{ pathname: "/", search: "?data=movies" }}>Movies Data Set</Link>
          </li>
          <li>
            <Link to={{ pathname: "/", search: "?data=kickstarter" }}>Kickstarter Data Set</Link>
          </li>
        </ul>
      </nav>
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
