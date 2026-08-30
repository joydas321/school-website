"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbyx-Xjx5rvJD4J9fsH8aVUQX_OoPXEqJyTygKxwvsPaZbmo5p7jjynE0ykXpRCderSlkw/exec";

type Notice = {
  Type?: string;
  Title?: string;
  Description?: string;
  Date?: string;
  "Image URL"?: string;
};

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotices() {
      try {
        const response = await fetch(
          `${API_URL}?t=${Date.now()}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status}`
          );
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const filtered = data.filter(
            (item: Notice) =>
              item.Type === "Notice" ||
              item.Type === "Important Notice"
          );

          setNotices(filtered);
        } else {
          setNotices([]);
        }
      } catch (error) {
        console.error(
          "Failed to load notices:",
          error
        );

        setNotices([]);
      } finally {
        setLoading(false);
      }
    }

    loadNotices();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="bg-[#102a43] text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">

          <a
            href="/"
            className="text-sm font-bold text-amber-300 hover:text-amber-200"
          >
            ← Back to Home
          </a>

          <p className="mt-6 text-sm font-black uppercase tracking-[0.25em] text-amber-300">
            School Updates
          </p>

          <h1 className="mt-2 text-4xl font-black md:text-5xl">
            School Notices
          </h1>

          <p className="mt-3 max-w-2xl text-slate-300">
            Stay updated with the latest school
            announcements and important notices.
          </p>

        </div>
      </header>


      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        {loading ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="font-bold text-slate-500">
              Loading notices...
            </p>
          </div>
        ) : notices.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

            <div className="text-5xl">
              📢
            </div>

            <h2 className="mt-4 text-2xl font-black text-[#102a43]">
              No Notices Available
            </h2>

            <p className="mt-2 text-slate-500">
              There are no school notices available
              at the moment.
            </p>

          </div>
        ) : (
          <div className="grid gap-6">

            {notices.map(
              (notice, index) => (
                <article
                  key={`${notice.Title}-${index}`}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex flex-col md:flex-row">

                    {/* IMAGE */}
                    {notice["Image URL"] && (
                      <div className="md:w-72">

                        <img
                          src={
                            notice["Image URL"]
                          }
                          alt={
                            notice.Title ||
                            "School Notice"
                          }
                          className="h-64 w-full object-cover md:h-full"
                        />

                      </div>
                    )}


                    {/* DETAILS */}
                    <div className="flex-1 p-7 md:p-8">

                      <div className="flex flex-wrap items-center gap-3">

                        {notice.Type ===
                          "Important Notice" && (
                          <span className="rounded-full bg-red-100 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-red-600">
                            🔴 Important
                          </span>
                        )}

                        {notice.Type ===
                          "Notice" && (
                          <span className="rounded-full bg-blue-100 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-blue-600">
                            📢 Notice
                          </span>
                        )}

                      </div>


                      <h2 className="mt-4 text-2xl font-black text-[#102a43] md:text-3xl">
                        {notice.Title}
                      </h2>


                      {notice.Date && (
                        <p className="mt-3 font-bold text-amber-600">
                          📅 {notice.Date}
                        </p>
                      )}


                      {notice.Description && (
                        <p className="mt-5 whitespace-pre-line leading-8 text-slate-600">
                          {notice.Description}
                        </p>
                      )}

                    </div>

                  </div>

                </article>
              )
            )}

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