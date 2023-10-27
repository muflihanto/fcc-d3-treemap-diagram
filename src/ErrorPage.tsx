import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8">
      <h1 className="font-bold text-5xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {isRouteErrorResponse(error) ? (
        <p className="text-slate-700">
          <i>{error.statusText || error.data}</i>
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
