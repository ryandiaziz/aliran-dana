import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-extrabold text-emerald-600 tracking-tight">404</h1>
          <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
          <p className="text-gray-500 text-lg">
            Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL?
            {error && (
                <span className="block mt-2 text-sm text-red-500 bg-red-50 p-2 rounded">
                    {error.statusText || error.message}
                </span>
            )}
          </p>
        </div>
        
        <div>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 shadow-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
