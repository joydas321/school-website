"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbyx-Xjx5rvJD4J9fsH8aVUQX_OoPXEqJyTygKxwvsPaZbmo5p7jjynE0ykXpRCderSlkw/exec";

type Staff = {
  Type?: string;
  Title?: string;
  Description?: string;
  Date?: string;
  "Image URL"?: string;
};

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStaff() {
      try {
        const response = await fetch(
          `${API_URL}?t=${Date.now()}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setStaff(
            data.filter(
              (item: Staff) =>
                item.Type === "Teacher"
            )
          );
        }
      } catch (error) {
        console.error(
          "Failed to load staff:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadStaff();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="bg-[#102a43] py-10 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <a
            href="/"
            className="text-sm font-bold text-amber-300"
          >
            ← Back to Home
          </a>

          <p className="mt-6 text-sm font-black uppercase tracking-[0.25em] text-amber-300">
            Our Team
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Teachers & Staff
          </h1>

          <p className="mt-3 text-slate-300">
            Meet our dedicated teachers and staff
            members.
          </p>

        </div>
      </header>

      {/* STAFF CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            Loading teachers and staff...
          </div>
        ) : staff.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

            <div className="text-5xl">
              👨‍🏫
            </div>

            <h2 className="mt-4 text-2xl font-black text-[#102a43]">
              No Staff Information Available
            </h2>

            <p className="mt-2 text-slate-500">
              Teacher and staff information will
              appear here.
            </p>

          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {staff.map((person, index) => (
              <article
                key={`${person.Title}-${index}`}
                className="overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* PHOTO */}
                {person["Image URL"] ? (
                  <img
                    src={person["Image URL"]}
                    alt={
                      person.Title ||
                      "Teacher"
                    }
                    className="h-72 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-72 items-center justify-center bg-slate-100 text-7xl">
                    👨‍🏫
                  </div>
                )}

                {/* DETAILS */}
                <div className="p-6">

                  <span className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-xs font-black uppercase text-purple-700">
                    👨‍🏫 Teacher / Staff
                  </span>

                  <h2 className="mt-4 text-2xl font-black text-[#102a43]">
                    {person.Title}
                  </h2>

                  {person.Description && (
                    <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">
                      {person.Description}
                    </p>
                  )}

                  {person.Date && (
                    <p className="mt-4 text-sm font-bold text-amber-600">
                      📅 {person.Date}
                    </p>
                  )}

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

      {/* FOOTER */}
      <footer className="bg-[#071827] py-7 text-center text-sm text-slate-400">

        <p>
          PM SHRI Adarsh Vidyalaya, Barkhetri
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