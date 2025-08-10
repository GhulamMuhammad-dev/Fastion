import {useState} from 'react'
import supabase from '@/lib/supabase_client'

const SupabaseConnect = () => {
   const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.name || !formData.email) {
      setMessage("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("userdata")
        .insert([{ name: formData.name, email: formData.email }]);

      if (error) throw error;
      setMessage("✅ User added successfully!");
      setFormData({ name: "", email: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding user: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-gray-800 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Add User</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
  
}

export default SupabaseConnect
