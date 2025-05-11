import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/students", label: "Students" },
    { path: "/drives", label: "Drives" },
    { path: "/reports", label: "Reports" },
  ];

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-blue-800 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-8">Vaccination Portal</h1>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded text-lg text-center ${
                location.pathname === item.path ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-10 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-lg"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-10 bg-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
