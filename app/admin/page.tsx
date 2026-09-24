"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbz2teJUKT2hmmnzdNTCdky3k6p2cYfE4CcWkdW2XVoHIFURQuPaPrqHFF7lvKnFykhoaQ/exec";

type ContentItem = {
  Type?: string;
  Title?: string;
  Description?: string;
  Date?: string;
  "Image URL"?: string;
};

const adminSections = [
  {
    icon: "📢",
    title: "Notices",
    path: "/admin/notices",
    type: ["Notice", "Important Notice"],
    description: "Add and manage important school notices.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: "🏆",
    title: "Achievements",
    path: "/admin/achievements",
    type: ["Achievement"],
    description: "Upload student and teacher achievements.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: "👨🏫",
    title: "Teachers & Staff",
    path: "/admin/staff",
    type: ["Teacher"],
    description: "Add, edit and manage staff profiles.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: "📸",
    title: "Gallery",
    path: "/admin/gallery",
    type: ["Gallery", "Gallery Photo"],
    description: "Upload and manage school photos.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: "💼",
    title: "Jobs",
    path: "/admin/jobs",
    type: ["Job"],
    description: "Publish school job and recruitment updates.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: "🎉",
    title: "Events",
    path: "/admin/events",
    type: ["Event"],
    description: "Create and manage school events.",
    color: "from-red-500 to-rose-500",
  },
    {
  icon: "📄",
  title: "Mandatory Public Disclosure",
  path: "/admin/documents",
  type: ["Document"],
  description: "Upload prospectus, Mandatory Public Disclosure.",
  color: "from-slate-500 to-slate-700",
  },
  {
    icon: "🏫",
    title: "Facilities",
    path: "/admin/facilities",
    type: ["Facility"],
    description: "Manage school facilities and photos.",
    color: "from-teal-500 to-cyan-600",
  },
];

export default function AdminPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(`${API_URL}?t=${Date.now()}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setItems(data);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function countFor(types: string[]) {
    return items.filter((item) =>
      types.includes(item.Type || "")
    ).length;
  }

  const total = items.length;

  return (
    <main className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="bg-[#102a43] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-8">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              School Management
            </p>

            <h1 className="mt-1 text-2xl font-black">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-300">
              PM SHRI Adarsh Vidyalaya, Barkhetri
            </p>
          </div>

          <a
            href="/"
            className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            ← Website
          </a>

        </div>
      </header>

      {/* MAIN */}
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* WELCOME */}
        <section className="rounded-3xl bg-gradient-to-r from-[#102a43] to-[#1f4e70] p-7 text-white shadow-xl md:p-10">

          <span className="rounded-full bg-amber-400/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-300">
            School Content Management
          </span>

          <h2 className="mt-5 text-3xl font-black md:text-4xl">
            Welcome to the Admin Panel 👋
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Manage notices, achievements, teachers, gallery, jobs,
            events, documents and facilities from one place.
          </p>

        </section>

        {/* QUICK STATS */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {adminSections.slice(0, 4).map((section) => (
            <a
              key={section.title}
              href={section.path}
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <p className="text-3xl">
                {section.icon}
              </p>

              <p className="mt-4 text-3xl font-black text-[#102a43]">
                {loading ? "…" : countFor(section.type)}
              </p>

              <p className="text-sm text-slate-500">
                {section.title}
              </p>

            </a>
          ))}

        </section>

        {/* CONTENT MANAGEMENT */}
        <section className="mt-12">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-500">
            Manage Website
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#102a43]">
            Content Management
          </h2>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {adminSections.map((section) => (
              <div
                key={section.title}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* CARD HEADER */}
                <div
                  className={`bg-gradient-to-r ${section.color} p-6 text-white`}
                >
                  <div className="flex items-center justify-between">

                    <span className="text-4xl">
                      {section.icon}
                    </span>

                    <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold">
                      {loading ? "…" : countFor(section.type)}
                    </span>

                  </div>
                </div>

                {/* CARD BODY */}
                <div className="p-6">

                  <h3 className="text-xl font-black text-[#102a43]">
                    {section.title}
                  </h3>

                  <p className="mt-2 min-h-[50px] text-sm leading-6 text-slate-500">
                    {section.description}
                  </p>

                  <a
                    href={section.path}
                    className="mt-5 block w-full rounded-xl bg-[#102a43] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#183b5c]"
                  >
                    Open Management →
                  </a>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* LIVE DATA */}
        <section className="mt-12 rounded-3xl bg-white p-7 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-amber-500">
                Live Data
              </p>

              <h3 className="mt-2 text-2xl font-black text-[#102a43]">
                Google Sheet Content
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Dashboard counts are loaded from the connected Google Sheet.
              </p>

            </div>

            <div className="rounded-2xl bg-slate-100 px-6 py-4 text-center">

              <p className="text-3xl font-black text-[#102a43]">
                {loading ? "…" : total}
              </p>

              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total records
              </p>

            </div>

          </div>

        </section>

      </div>

      {/* FOOTER */}
      <footer className="mt-10 bg-[#071827] py-6 text-center text-sm text-slate-400">

        <p>
          PM SHRI Adarsh Vidyalaya, Barkhetri — Admin Dashboard
        </p>

        <p className="mt-1">
          Website by{" "}

          <a
            href="https://www.instagram.com/bikashai1/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-pink-400 hover:text-pink-300"
          >
            Bikash AI
          </a>

        </p>

      </footer>

    </main>
  );
}

