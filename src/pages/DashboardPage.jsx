import { Outlet, useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-md space-y-6">
      <h1 className="text-4xl font-bold text-center text-gray-900">
        👩‍💼 Admin Dashboard
      </h1>

      <p className="text-center text-gray-600">
        Welcome, Admin. From here you can manage the products that youre
        listing!
      </p>

      <div className="flex justify-center">
        <button
          onClick={() => navigate("add-product")}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Add a New Product
        </button>
      </div>

      <Outlet />
    </div>
  );
}

export default DashboardPage;
