import { useRouteError } from "react-router-dom";

export default function ErrorPage({ customError }) {
  let error = useRouteError();

  if (!customError) console.error(error);

  if (customError)
    return (
      <div className="flex justify-center items-center h-screen text-center">
        <div>
          <h1 className="text-4xl font-medium mb-4">Oops!</h1>
          <p className="text-lg mb-4">
            Sorry, an unexpected error has occurred.
          </p>
          <p>
            <i>{customError.status || customError.error}</i>
          </p>
        </div>
      </div>
    );
  return (
    <div className="flex justify-center items-center h-screen text-center">
      <div>
        <h1 className="text-4xl font-medium mb-4">Oops!</h1>
        <p className="text-lg mb-4">Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message || error}</i>
        </p>
      </div>
    </div>
  );
}
