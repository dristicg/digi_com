import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4">Oops! Page not found.</p>
      <Link to="/shop/home" className="mt-6 px-4 py-2 bg-black text-white rounded-md">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
