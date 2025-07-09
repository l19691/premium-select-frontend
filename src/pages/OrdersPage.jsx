import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

function OrdersPage() {
  const { items } = useSelector((state) => state.products);
  const { user } = useAuth();

  const [selectedIds, setSelectedIds] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedIds.length) {
      setStatus({
        type: "warning",
        message: "⚠️ Please select at least one product.",
      });
      return;
    }

    const selectedProducts = items.filter((p) => selectedIds.includes(p.id));
    const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);

    const newOrder = {
      userId: user.id,
      productIds: selectedIds,
      total,
    };

    try {
      await axios.post("http://localhost:3001/orders", newOrder);
      setStatus({ type: "success", message: "✅ Order placed successfully!" });
      setSelectedIds([]);
    } catch {
      setStatus({ type: "error", message: "❌ Failed to place order." });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 mt-12 rounded-xl shadow-md space-y-6">
      <h1 className="text-4xl font-bold text-center text-gray-900">
        🛒 Order our Products
      </h1>

      {status.message && (
        <p
          className={`text-center font-medium ${
            status.type === "error"
              ? "text-red-600"
              : status.type === "success"
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {status.message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {items.map((product) => (
          <label
            key={product.id}
            className={`flex items-center justify-between border px-4 py-3 rounded-lg cursor-pointer transition ${
              selectedIds.includes(product.id)
                ? "bg-blue-50 border-blue-500"
                : "hover:bg-gray-50"
            }`}
          >
            <div>
              <strong className="block text-gray-800">{product.name}</strong>
              <span className="text-sm text-gray-500">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <input
              type="checkbox"
              className="scale-125 accent-blue-600"
              checked={selectedIds.includes(product.id)}
              onChange={() => handleToggle(product.id)}
            />
          </label>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Confirm your Order
        </button>
      </form>
    </div>
  );
}

export default OrdersPage;
