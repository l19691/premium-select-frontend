import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Layout() {
  const { user, isAuthenticated, logoutUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NAVBAR */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <nav className="flex gap-6 text-gray-800 font-medium text-base">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
              }
            >
              Products
            </NavLink>
            {isAuthenticated && user.role === "admin" && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
                }
              >
                Dashboard
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
                }
              >
                Orders
              </NavLink>
            )}
          </nav>

          {/* Logout / Login */}
          <div>
            {!isAuthenticated ? (
              <NavLink
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </NavLink>
            ) : (
              <button
                onClick={logoutUser}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Logout ({user.name})
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow px-4 py-6">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-white text-center text-gray-400 py-4 text-sm border-t mt-6">
        &copy; {new Date().getFullYear()} Premium Select · All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;
