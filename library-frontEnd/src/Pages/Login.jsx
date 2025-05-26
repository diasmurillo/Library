import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.isAdmin));
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <main className="max-w-7xl p-2 mx-auto md:min-h-screen ">
        <section className="md:w-md mx-auto p-4 rounded-2xl bg-gray-800 text-white mt-48">
          <h1 className="font-medium text-4xl text-center">Login</h1>
          <form onSubmit={handleLoginSubmit} noValidate className="flex flex-col">
            <label htmlFor="email" className="font-medium pb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-1 border rounded-2xl" 
            />

            <label htmlFor="password" className="font-medium pt-3 pb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-1 border rounded-2xl" 
            />

            <button type="submit" disabled={loading} className="w-fit rounded-2xl bg-gray-200 text-black shadow-md py-1 px-4 mt-5 cursor-pointer transition duration-300 hover:bg-gray-300">
              {loading ? "Logging in..." : "Sign In"}
            </button>
            <div className="mt-3 font-bold text-red-500">
              {error && <p>{error}</p>}
            </div>
          </form>
          <p className="mt-3">You do not have an account? <Link to='/register' className="font-medium">Register</Link></p>
        </section>
      </main>
    </div>
  );
}
