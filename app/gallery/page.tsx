"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbz2teJUKT2hmmnzdNTCdky3k6p2cYfE4CcWkdW2XVoHIFURQuPaPrqHFF7lvKnFykhoaQ/exec";

type GalleryItem = {
  Type?: string;
  Title?: string;
  Description?: string;
  Date?: string;
  "Image URL"?: string;
};

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const response = await fetch(`${API_URL}?t=${Date.now()}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const galleryItems = data.filter(
            (item: GalleryItem) =>
              item.Type === "Gallery" ||
              item.Type === "Gallery Photo"
          );

          setGallery(galleryItems);
        } else {
          setGallery([]);
        }
      } catch (error) {
        console.error("Failed to load gallery:", error);
        setGallery([]);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="px-6 pb-12 pt-10 text-center">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-500">
          SCHOOL LIFE
        </p>

        <h1 className="mt-3 text-4xl font-black text-[#102a43] md:text-5xl">
          School Gallery
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-slate-500">
          Explore memorable moments, activities and events from our school.
        </p>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-6 pb-16">

        {loading ? (
          <div className="py-20 text-center">
            <p className="text-lg font-bold text-slate-500">
              Loading gallery...
            </p>
          </div>
        ) : gallery.length === 0 ? (
          <div className="rounded-3xl bg-slate-50 px-6 py-20 text-center">
            <p className="text-5xl">📸</p>

            <h2 className="mt-5 text-2xl font-black text-[#102a43]">
              No Gallery Photos Yet
            </h2>

            <p className="mt-2 text-slate-500">
              Upload a photo from the Admin Gallery section.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2">

            {gallery.map((item, index) => (
              <article
                key={`${item.Title}-${index}`}
                className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >

                {/* IMAGE */}
                {item["Image URL"] ? (
                  <img
                    src={item["Image URL"]}
                    alt={item.Title || "School Gallery"}
                    className="h-[320px] w-full object-cover md:h-[400px]"
                  />
                ) : (
                  <div className="flex h-[320px] items-center justify-center bg-slate-100 md:h-[400px]">
                    <span className="text-6xl">📷</span>
                  </div>
                )}

                {/* CONTENT */}
                <div className="bg-[#102a43] p-6 text-white">

                  <h2 className="text-2xl font-black">
                    {item.Title || "School Gallery"}
                  </h2>

                  {item.Description && (
                    <p className="mt-2 text-slate-300">
                      {item.Description}
                    </p>
                  )}

                  {item.Date && (
                    <p className="mt-4 text-sm font-bold text-amber-400">
                      📅 {item.Date}
                    </p>
                  )}

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}