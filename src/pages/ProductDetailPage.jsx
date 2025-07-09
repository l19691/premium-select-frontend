import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/products/${id}`);
        setProduct(res.data);
      } catch {
        setError("❌ Product not found or server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600 text-lg">
        Loading product...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-600 text-lg font-semibold">
        {error}
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 mt-12 rounded-xl shadow-md space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

      <p className="text-gray-700 text-lg leading-relaxed">
        {product.description}
      </p>

      <p className="text-xl font-semibold text-green-700">
        ${product.price.toFixed(2)}
      </p>

      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-4 py-1 rounded-full uppercase tracking-wide">
        {product.category}
      </span>
    </div>
  );
}

export default ProductDetailPage;
