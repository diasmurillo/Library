
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("http://localhost:3000/api/users/profile", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setEmail(data.email);
        setBirthDate(data.birthDate?.slice(0, 10)); 
      } catch (err) {
        setError(err.message);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, birthDate })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage("Profile updated successfully");
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <section className="md:w-md mx-auto p-4 rounded-2xl bg-gray-800 text-white">
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}

                <label className="font-medium pt-3 pb-1">Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="py-2 px-1 border rounded-2xl" required />

                <label className="font-medium pt-3 pb-1">Birth Date:</label>
                <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="py-2 px-1 border rounded-2xl" required />

                <button type="submit" disabled={loading}
                className="w-fit rounded-2xl bg-gray-200 text-black shadow-md py-1 px-4 mt-5 cursor-pointer transition duration-300 hover:bg-gray-300">
                {loading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </section>
      
    </main>
  );
}
