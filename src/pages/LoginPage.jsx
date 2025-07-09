import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    loginUser({
      id: 1,
      name: role === "admin" ? "Admin User" : "Customer",
      role,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          🔐 Choose Your Role
        </h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleLogin("admin")}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Login as Admin
          </button>
          <button
            onClick={() => handleLogin("user")}
            className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Login as Customer
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
