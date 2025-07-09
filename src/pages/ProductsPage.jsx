import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:3001/products/${id}`);
      dispatch(fetchProducts());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-4xl font-bold text-center text-gray-900">
        🛍️ Explore Our Collection
      </h1>

      {status === "loading" && (
        <p className="text-center text-gray-600">Loading products...</p>
      )}
      {status === "failed" && (
        <p className="text-red-600 text-center font-medium">Error: {error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-700 font-semibold">
                ${product.price.toFixed(2)}
              </p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {isAuthenticated && user.role === "admin" && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => navigate(`/products/edit/${product.id}`)}
                  className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete Product
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
