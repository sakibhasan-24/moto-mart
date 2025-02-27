import { useEffect } from "react";
import {
  useGetAllOrdersMutation,
  useUpdateOrderStatusMutation,
} from "../../redux/api/orderApi";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaBoxOpen,
  FaShippingFast,
} from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";

export default function OrderList() {
  const token: any = localStorage.getItem("token");
  const { user }: any = useAppSelector((state) => state.auth);
  const isAdmin: any = user?.role === "admin";
  const [fetchOrders, { data: orders, error, isLoading }] =
    useGetAllOrdersMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  useEffect(() => {
    if (token) {
      fetchOrders(token)
        .unwrap()
        .catch((err) => console.error("Fetch Error:", err));
    }
  }, [token, fetchOrders]);

  const getOrderProgress = (status: string) => {
    const statusMap = {
      pending: {
        progress: 10,
        color: "bg-gray-400",
        icon: <FaBoxOpen />,
        label: "Pending",
      },
      processing: {
        progress: 40,
        color: "bg-yellow-400",
        icon: <FaTruck />,
        label: "Processing",
      },
      shipped: {
        progress: 70,
        color: "bg-blue-500",
        icon: <FaShippingFast />,
        label: "Shipped",
      },
      delivered: {
        progress: 100,
        color: "bg-green-500",
        icon: <FaCheckCircle />,
        label: "Delivered",
      },
    };
    return (
      (statusMap as any)[status.toLowerCase()] || {
        progress: 0,
        color: "bg-gray-300",
        icon: <FaTimesCircle />,
        label: "Unknown",
      }
    );
  };

  const statusOptions = ["Processing", "Shipped", "Delivered"];

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({
        orderId,
        orderStatus: newStatus,
        token,
      }).unwrap();
      fetchOrders(token);
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white shadow-xl rounded-lg border border-gray-800">
      <h2 className="text-3xl font-bold text-center mb-6">📦 Your Orders</h2>

      {isLoading && (
        <p className="text-gray-400 text-center">Loading orders...</p>
      )}
      {error && (
        <p className="text-red-500 text-center">Error fetching orders</p>
      )}

      <ul className="space-y-6">
        {orders?.map((order: any) => {
          const { progress, color, icon, label } = getOrderProgress(
            order.orderStatus
          );
          return (
            <li
              key={order._id}
              className="border rounded-lg p-6 shadow-xl bg-gray-800 bg-opacity-40 backdrop-blur-lg hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">
                  Order ID: <span className="text-gray-300">{order._id}</span>
                </p>
                <p
                  className={`flex items-center gap-2 px-3 py-1 rounded ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } text-white`}
                >
                  {order.paymentStatus === "Paid" ? (
                    <FaCheckCircle />
                  ) : (
                    <FaTimesCircle />
                  )}
                  {order.paymentStatus}
                </p>
              </div>

              <p className="text-sm text-gray-400 mt-2">
                <strong>Price:</strong> ${order.totalPrice}
              </p>

              <div className="mt-4">
                <p className="text-sm font-semibold flex items-center gap-2 text-gray-300">
                  {icon} Order Status:
                </p>

                {isAdmin ? (
                  <div className="relative mt-2">
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order?._id, e.target.value)
                      }
                      className="w-full p-3 border border-gray-600 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 cursor-pointer"
                    >
                      {statusOptions.map((status) => (
                        <option
                          key={status}
                          value={status}
                          className="text-gray-900"
                        >
                          {status}
                        </option>
                      ))}
                    </select>

                    {/* Dropdown Arrow */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none">
                      ▼
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 mt-1">{label}</p>
                )}
                <div className="w-full bg-gray-700 h-3 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full ${color} transition-all`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
