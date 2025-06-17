import { useState } from "react";

export default function AuthForm({ type = "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("⏳ Please wait...");

    try {
      const res = await fetch(`http://localhost:5000/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg(`✅ ${type === "signup" ? "Account created!" : "Login successful!"}`);
      } else {
        setMsg(`❌ ${data?.error || "Something went wrong"}`);
      }
    } catch (err) {
      setMsg("❌ Server error: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-4 text-center capitalize">{type}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {type === "signup" ? "Sign Up" : "Login"}
        </button>
      </form>
      <p className="text-sm text-center mt-4">{msg}</p>
    </div>
  );
}
