// components/ProductSkeleton.tsx
export default function ProductSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl p-4 w-full h-72 shadow-md animate-pulse">
      <div className="bg-gray-700 h-36 w-full rounded mb-4" />
      <div className="h-4 bg-gray-600 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-600 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-600 rounded w-1/3" />
    </div>
  );
}
