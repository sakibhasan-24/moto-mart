import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useEffect } from "react";
import { useGetAdminDataMutation } from "../../redux/api/user.api";
import ProductSkeleton from "../../components/skeleton/Skeleton";
const today = new Date();
const formattedDate = today.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Summary() {
  const token = localStorage.getItem("token") || "";
  const [getAdminData, { data, isLoading, error }] = useGetAdminDataMutation();

  useEffect(() => {
    getAdminData(token)
      .unwrap()
      .catch(() => {});
  }, [token, getAdminData]);

  const stats = data?.stats;
  console.log(stats);

  const pieData = {
    labels: ["Delivered", "Processing", "Shipped"],
    datasets: [
      {
        label: "Order Status",
        data: [
          stats?.deliveredOrders || 0,
          stats?.processingOrders || 0,
          stats?.shippedOrders || 0,
        ],
        backgroundColor: ["#22c55e", "#facc15", "#3b82f6"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["Total Users", "Active Users", "Blocked Users"],
    datasets: [
      {
        label: "User Overview",
        data: [
          stats?.totalUsers || 0,
          stats?.activeUsers || 0,
          stats?.blockedUsers || 0,
        ],
        backgroundColor: ["#6366f1", "#22c55e", "#ef4444"],
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <ProductSkeleton />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Failed to load summary data. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400">
        📊 Admin Dashboard Overview
      </h1>
      <p className="text-gray-400 text-sm my-6">{formattedDate}</p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard
          label="🛒 Total Products"
          value={stats.totalProducts}
          color="bg-purple-600"
        />
        <StatCard
          label="📦 Total Orders"
          value={stats.totalOrders}
          color="bg-blue-600"
        />
        <StatCard
          label="📤 Shipped Orders"
          value={stats.shippedOrders}
          color="bg-teal-600"
        />
        <StatCard
          label="🧑‍🤝‍🧑 Total Users"
          value={stats.totalUsers}
          color="bg-green-600"
        />
        <StatCard
          label="✅ Active Users"
          value={stats.activeUsers}
          color="bg-emerald-600"
        />
        <StatCard
          label="🚫 Blocked Users"
          value={stats.blockedUsers}
          color="bg-red-600"
        />
        <StatCard
          label="📦 Delivered Orders"
          value={stats.deliveredOrders || 0}
          color="bg-lime-600"
        />
        <StatCard
          label="⏳ Pending Orders"
          value={stats.pendingOrders}
          color="bg-orange-500"
        />
        <StatCard
          label="⏳ Pending Order %"
          value={`${stats.pendingOrderPercentage}%`}
          color="bg-yellow-600"
        />
        <StatCard
          label="💰 Revenue from Paid Orders"
          value={`$${stats.totalRevenue?.toFixed(2)}`}
          color="bg-yellow-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            🧾 Order Status Breakdown
          </h2>
          <Pie data={pieData} />
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            👥 User Activity Overview
          </h2>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: any;
  color: string;
}) {
  return (
    <div
      className={`p-6 rounded-lg shadow-md ${color}`}
      title={`${label.replace(/^[^A-Za-z]+/, "")}: ${value}`}
    >
      <p className="text-lg font-semibold">{label}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}
