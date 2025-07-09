import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

interface User {
  email: string;
  name: string;
  role: string;
}

const API = "/api/auth/admin/users";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [form, setForm] = useState<User>({ email: "", name: "", role: "customer" });
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const token = localStorage.getItem("token") || "";

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch users");
      setUsers(data.users);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const openCreate = () => {
    setForm({ email: "", name: "", role: "customer" });
    setModalMode("create");
    setShowModal(true);
    setSelectedEmail(null);
  };

  const openEdit = (user: User) => {
    setForm(user);
    setModalMode("edit");
    setShowModal(true);
    setSelectedEmail(user.email);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ email: "", name: "", role: "customer" });
    setSelectedEmail(null);
  };

  const handleChange = (field: keyof User, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      let res, data;
      if (modalMode === "create") {
        res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create user");
      } else if (modalMode === "edit" && selectedEmail) {
        res = await fetch(`${API}/${selectedEmail}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update user");
      }
      closeModal();
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (email: string) => {
    if (!window.confirm("Delete this user?")) return;
    setError("");
    try {
      const res = await fetch(`${API}/${email}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete user");
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showLogout />
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" className="mb-4" asChild>
          <Link to="/admin/dashboard">&larr; Back to Dashboard</Link>
        </Button>
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <Button onClick={openCreate} className="mb-4">Create User</Button>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {loading ? (
          <div>Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Role</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.name}</td>
                    <td className="p-2 border">{user.role}</td>
                    <td className="p-2 border space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(user)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(user.email)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{modalMode === "create" ? "Create User" : "Edit User"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={e => handleChange("email", e.target.value)}
                  required
                  disabled={modalMode === "edit"}
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={e => handleChange("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="w-full border rounded p-2"
                  value={form.role}
                  onChange={e => handleChange("role", e.target.value)}
                  required
                >
                  <option value="customer">Customer</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {modalMode === "create" && (
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={(form as any).password || ""}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    required
                  />
                </div>
              )}
              <div className="flex justify-end space-x-2 pt-2">
                <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                <Button type="submit">{modalMode === "create" ? "Create" : "Update"}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
} 