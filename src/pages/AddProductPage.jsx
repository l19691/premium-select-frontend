import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";

function AddProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, category } = formData;

    if (!name || !description || !price || !category) {
      setStatus({ type: "error", message: "❌ All fields are required." });
      return;
    }

    try {
      const newProduct = {
        name,
        description,
        price: parseFloat(price),
        category,
      };

      await axios.post("http://localhost:3001/products", newProduct);
      dispatch(fetchProducts());

      setStatus({ type: "success", message: "✅ Product added successfully." });
      setFormData({ name: "", description: "", price: "", category: "" });

      setTimeout(() => navigate("/products"), 1000);
    } catch {
      setStatus({ type: "error", message: "❌ Failed to add product." });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-xl space-y-6">
      <h1 className="text-4xl font-bold text-center text-gray-900">
        ➕ Add Product
      </h1>

      {status.message && (
        <p
          className={`text-center font-medium ${
            status.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {status.message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Murano Glass Vase"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Elegant handmade glass..."
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="120.00"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Decor / Jewelry"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
