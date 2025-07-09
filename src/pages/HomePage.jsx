import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-6 text-center space-y-8">
      <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
        Welcome to <span className="text-blue-600">Premium Select</span>
      </h1>

      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Discover handcrafted Murano glass products, luxury home décor, and
        artisan jewelry. Browse our collection or manage your dashboard if
        you're an admin.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Link
          to="/products"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Explore our Products!
        </Link>
        <Link
          to="/login"
          className="border border-blue-600 text-blue-600 font-semibold px-6 py-3 rounded hover:bg-blue-50 transition"
        >
          Admin / Customer Login
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
