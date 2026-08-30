"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbyx-Xjx5rvJD4J9fsH8aVUQX_OoPXEqJyTygKxwvsPaZbmo5p7jjynE0ykXpRCderSlkw/exec";

type Achievement = {
  Type?: string;
  Title?: string;
  Description?: string;
  Date?: string;
  "Image URL"?: string;
};

export default function AchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAchievements() {
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
          setItems(
            data.filter(
              (item: Achievement) =>
                item.Type === "Achievement"
            )
          );
        }
      } catch (error) {
        console.error(
          "Failed to load achievements:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadAchievements();
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
            School Excellence
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Achievements
          </h1>

          <p className="mt-3 text-slate-300">
            Celebrating the achievements of our
            students and teachers.
          </p>

        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            Loading achievements...
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

            <div className="text-5xl">
              🏆
            </div>

            <h2 className="mt-4 text-2xl font-black text-[#102a43]">
              No Achievements Available
            </h2>

            <p className="mt-2 text-slate-500">
              No achievement records are available
              at the moment.
            </p>

          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2">

            {items.map((item, index) => (
              <article
                key={`${item.Title}-${index}`}
                className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >

                {/* PHOTO */}
                {item["Image URL"] && (
                  <img
                    src={item["Image URL"]}
                    alt={
                      item.Title ||
                      "Achievement"
                    }
                    className="h-64 w-full object-cover"
                  />
                )}

                <div className="p-7">

                  <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-xs font-black uppercase text-amber-700">
                    🏆 Achievement
                  </span>

                  <h2 className="mt-4 text-2xl font-black text-[#102a43]">
                    {item.Title}
                  </h2>

                  {item.Date && (
                    <p className="mt-2 font-bold text-amber-600">
                      📅 {item.Date}
                    </p>
                  )}

                  {item.Description && (
                    <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
                      {item.Description}
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
            className="font-semibold text-pink-400"
          >
            Bikash AI
          </a>
        </p>

      </footer>

    </main>
  );
}