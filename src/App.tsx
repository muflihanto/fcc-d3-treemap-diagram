import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import VideoGame from "./Diagram";
import ErrorPage from "./ErrorPage";
import { useState } from "react";
import { useCallbackRef } from "use-callback-ref";
import * as d3 from "d3";

export type ContextType = { tooltip: d3.Selection<HTMLDivElement, unknown, null, undefined> | null };

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
  const [tooltip, setTooltip] = useState<ContextType["tooltip"]>(null);
  const container = useCallbackRef(null, (el: HTMLDivElement | null) => {
    if (el !== null) {
      setTooltip(d3.select(el).append("div").attr("id", "tooltip").classed("tooltip opacity-0 absolute p-3 text-[12px] bg-teal-300 rounded shadow pointer-events-none", true).style("opacity", "0"));
    }
  });

  return (
    <div
      className="container mx-auto py-8"
      ref={container}
    >
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
        <Outlet context={{ tooltip } satisfies ContextType} />
      </div>
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
