// @ts-nocheck
import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { FaUser, FaUserCheck, FaUserTimes } from "react-icons/fa";
import {
  useActionForUserMutation,
  useGetAllUsersMutation,
} from "../../redux/api/user.api";
import Loader from "../../components/loader/Loader";

export default function Users() {
  const token = localStorage.getItem("token");
  const { user }: any = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  // Mutations
  const [getAllUsers, { data: users, error, isLoading }] =
    useGetAllUsersMutation();
  const [actionForUser] = useActionForUserMutation();

  useEffect(() => {
    getAllUsers(token)
      .unwrap()
      .catch((err) => {
        console.error("Fetch Error:", err);
        if (err?.status === 401 || err?.status === 403) {
          alert("Access Denied! Admins Only.");
        }
      });
  }, [token, getAllUsers]);

  const handleUserAction = async (userId: string, isBlocked: boolean) => {
    try {
      await actionForUser({ userId, action: "toggleBlock", token }).unwrap();
      getAllUsers(token);
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white shadow-lg rounded-lg border border-gray-800">
      <h2 className="text-3xl font-bold text-center mb-6">
        👥 User Management
      </h2>

      {isLoading && (
        <p className="text-gray-400 text-center">
          <Loader />
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center">Error fetching users</p>
      )}

      <ul className="space-y-6">
        {users?.data?.map((user: any) => (
          <li
            key={user._id}
            className="border rounded-lg p-6 shadow-lg bg-gray-800 bg-opacity-50 backdrop-blur-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold flex items-center gap-2">
                <FaUser /> {user.name}
              </p>
              <span
                className={`px-3 py-1 rounded ${
                  user.isBlocked ? "bg-red-500" : "bg-green-500"
                } text-white flex items-center gap-2`}
              >
                {user.isBlocked ? <FaUserTimes /> : <FaUserCheck />}
                {user.isBlocked ? "Blocked" : "Active"}
              </span>
            </div>

            <p className="text-sm text-gray-400 mt-2">
              <strong>Email:</strong> {user.email}
            </p>

            {isAdmin && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleUserAction(user._id, user.isBlocked)}
                  className={`px-4 py-2 text-white font-semibold rounded-lg transition-all duration-300 ${
                    user.isBlocked
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {user.isBlocked ? "Unblock User" : "Block User"}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
