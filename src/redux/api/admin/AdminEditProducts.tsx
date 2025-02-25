import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUpdateProductMutation,
  useGetProductByIdMutation,
} from "../productsApi";
import { toast } from "react-toastify";

export default function AdminEditProduct() {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  // API Calls
  const [
    getProductById,
    { data: productData, error: fetchError, isLoading: fetching },
  ] = useGetProductByIdMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  // State for Form Fields
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    image: null as File | null,
    previewImage: "",
  });

  // Fetch existing product data
  useEffect(() => {
    if (productId) {
      getProductById(productId);
    }
  }, [productId, getProductById]);

  // Load product data into state
  useEffect(() => {
    if (productData?.data) {
      const { name, brand, category, description, price, quantity, image } =
        productData.data;
      setFormData({
        name,
        brand,
        category,
        description,
        price: price.toString(),
        quantity: quantity.toString(),
        image: null,
        previewImage: image, // Set preview to existing image
      });
    }
  }, [productData]);

  // Handle Text Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        previewImage: URL.createObjectURL(file), // Show new preview
      });
    }
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("quantity", formData.quantity);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await updateProduct({
        productId,
        formData: formDataToSend,
        token,
      }).unwrap();
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update product.");
    }
  };

  if (fetching)
    return (
      <p className="text-center text-yellow-500">Loading product data...</p>
    );
  if (fetchError)
    return <p className="text-center text-red-500">Failed to load product.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
        ✏️ Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          {formData.previewImage && (
            <img
              src={formData.previewImage}
              alt="Product Preview"
              className="w-32 h-32 object-cover rounded-lg shadow"
            />
          )}
          <label className="block mt-2 text-yellow-500 cursor-pointer">
            Upload New Image
            <input
              type="file"
              name="image"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm text-gray-300">Product Name</label>
          <input
            type="text"
            name="name"
            defaultValue={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm text-gray-300">Brand</label>
          <input
            type="text"
            name="brand"
            defaultValue={formData.brand}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-gray-300">Category</label>
          <input
            type="text"
            name="category"
            defaultValue={formData.category}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-300">Description</label>
          <textarea
            name="description"
            defaultValue={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400"
          />
        </div>

        {/* Price & Quantity (Side by Side) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300">Price ($)</label>
            <input
              type="number"
              name="price"
              defaultValue={formData.price}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300">Quantity</label>
            <input
              type="number"
              name="quantity"
              defaultValue={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={updating}
          className="w-full py-2 mt-4 text-black bg-yellow-500 rounded-lg hover:bg-yellow-600 transition font-semibold"
        >
          {updating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
