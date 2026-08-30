"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "pmshriadarsvidyalaya@gmail.com";
const ADMIN_PASSWORD = "PMShri@2026";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("school_admin_logged_in", "true");

      router.push("/admin");
      return;
    }

    setLoading(false);
    setError("❌ Invalid email or password.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#102a43] text-4xl">
            🔐
          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-amber-500">
            PM SHRI School
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#102a43]">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Authorized school administrators only
          </p>

        </div>


        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-400"
              required
            />
          </div>


          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-400"
              required
            />
          </div>


          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-bold text-red-600">
              {error}
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#102a43] px-5 py-4 font-black text-white transition hover:bg-[#183b5c] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "🔐 Login to Admin"}
          </button>

        </form>


        <a
          href="/"
          className="mt-6 block text-center text-sm font-semibold text-slate-500 hover:text-[#102a43]"
        >
          ← Back to Website
        </a>

      </div>

    </main>
  );
}