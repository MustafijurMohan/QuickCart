import { Link } from "react-router";

const NotFound = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-6xl font-bold text-black mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Go Back Home
      </Link>
    </div>
    </>
  )
}

export default NotFound