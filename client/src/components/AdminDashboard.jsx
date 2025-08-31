import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ users: 0, vendors: 0, pending: 0 });
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/auth/currentuser`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/admin/vendor-applications`, {
        withCredentials: true,
      });
      setApplications(res.data);

      // update counts
      const usersRes = await axios.get(`${BACKEND_URL}/admin/users/count`, {
        withCredentials: true,
      });
      const vendorsRes = await axios.get(`${BACKEND_URL}/admin/vendors/count`, {
        withCredentials: true,
      });

      setStats({
        users: usersRes.data.count,
        vendors: vendorsRes.data.count,
        pending: res.data.filter((a) => a.status === "pending").length,
      });
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };
const approve = async (id) => {
  try {
    await axios.patch(
      `${BACKEND_URL}/admin/vendor-applications/${id}/approve`,
      {},
      { withCredentials: true }
    );

    setApplications((prev) => prev.filter((app) => app._id !== id));
    setStats((prev) => ({ ...prev, pending: prev.pending - 1 }));

    toast.success("Vendor approved successfully!");
  } catch (err) {
    console.error(err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Failed to approve vendor");
  }
};

const reject = async (id) => {
  try {
    await axios.patch(
      `${BACKEND_URL}/admin/vendor-applications/${id}/reject`,
      { reason: "Not suitable" },
      { withCredentials: true }
    );

    setApplications((prev) => prev.filter((app) => app._id !== id));
    setStats((prev) => ({ ...prev, pending: prev.pending - 1 }));

    toast.success("Vendor rejected successfully!");
  } catch (err) {
    console.error(err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Failed to reject vendor");
  }
};


  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-orange-100 p-6 rounded-2xl shadow-md border-l-4 border-orange-500">
          <h2 className="text-base md:text-lg font-semibold text-gray-700">
            Total Users
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-orange-600">
            {stats.users}
          </p>
        </div>
        <div className="bg-orange-100 p-6 rounded-2xl shadow-md border-l-4 border-orange-500">
          <h2 className="text-base md:text-lg font-semibold text-gray-700">
            Total Vendors
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-orange-600">
            {stats.vendors}
          </p>
        </div>
        <div className="bg-orange-100 p-6 rounded-2xl shadow-md border-l-4 border-orange-500">
          <h2 className="text-base md:text-lg font-semibold text-gray-700">
            Pending Approvals
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-orange-600">
            {stats.pending}
          </p>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white shadow-md rounded-2xl p-4 overflow-x-auto">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
          Vendor Applications
        </h2>
        {applications.length === 0 ? (
          <p className="text-gray-600">No pending applications.</p>
        ) : (
          <table className="w-full border border-gray-200 rounded-lg min-w-[600px]">
            <thead>
              <tr className="bg-orange-50 text-gray-700 text-sm md:text-base">
                <th className="border p-2 md:p-3">Name</th>
                <th className="border p-2 md:p-3">Categories</th>
                <th className="border p-2 md:p-3">User</th>
                <th className="border p-2 md:p-3">Mobile</th>
                <th className="border p-2 md:p-3">Status</th>
                <th className="border p-2 md:p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-orange-50 transition text-sm md:text-base">
                  <td className="border p-2 md:p-3">{app.name}</td>
                  <td className="border p-2 md:p-3">{app.categories.join(", ")}</td>
                  <td className="border p-2 md:p-3">
                    {app.user?.username} ({app.user?.email})
                  </td>
                  <td className="border p-2 md:p-3">{app.mobile}</td>
                  <td className="border p-2 md:p-3 capitalize">{app.status}</td>
                  <td className="border p-2 md:p-3 flex flex-col sm:flex-row gap-2">
                    {app.status === "pending" && (
                      <>
                        <button
                          onClick={() => approve(app._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => reject(app._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>

  );
}

export default AdminDashboard;
