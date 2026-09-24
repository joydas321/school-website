"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbyx-Xjx5rvJD4J9fsH8aVUQX_OoPXEqJyTygKxwvsPaZbmo5p7jjynE0ykXpRCderSlkw/exec";

type ContentItem = {
  Type?: string;
  Title?: string;
  Description?: string;
  Date?: string;
  "Image URL"?: string;
};

const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Academics", "#academics"],
  ["Achievements", "#achievements"],
  ["Facilities", "#facilities"],
  ["Gallery", "#gallery"],
  ["Disclosure", "#disclosure"],
  ["Contact", "#contact"],
];

function formatDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function Home() {
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
        console.error("Failed to load website data:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  /* ================================
     TYPE BASED DATA
  ================================= */

  const notices = items.filter(
    (item) =>
      item.Type === "Notice" ||
      item.Type === "Important Notice"
  );

  const achievements = items.filter(
    (item) => item.Type === "Achievement"
  );

  const staff = items.filter(
    (item) => item.Type === "Teacher"
  );

  const gallery = items.filter(
    (item) =>
      item.Type === "Gallery" ||
      item.Type === "Gallery Photo"
  );

  const jobs = items.filter(
    (item) => item.Type === "Job"
  );

  const events = items.filter(
    (item) => item.Type === "Event"
  );

  const documents = items.filter(
    (item) => item.Type === ""
  );

  const facilities = items.filter(
    (item) => item.Type === "Facility"
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header className="sticky top-0 z-50 bg-[#102a43] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">

          <a
            href="#home"
            className="flex items-center gap-3"
          >
            <img
              src="/school-logo.jpeg.jpeg"
              alt="School Logo"
              className="h-14 w-14 rounded-full bg-white object-contain p-1 shadow-md ring-2 ring-white/20"
            />

            <div>
              <p className="text-xs font-bold text-amber-300">
                PM SHRI SCHOOL
              </p>

              <h1 className="text-sm font-black md:text-lg">
                PM SHRI Adarsh Vidyalaya
              </h1>

              <p className="text-xs text-slate-300">
                Barkhetri, Nalbari, Assam
              </p>
            </div>
          </a>

          <nav className="hidden gap-6 text-sm font-bold lg:flex">
            {navItems.map(([label, href], index) => (
              <a
                key={label}
                href={href}
                className={
                  index === 0
                    ? "text-amber-300"
                    : "hover:text-amber-300"
                }
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="/admin/login"
            className="rounded-xl bg-amber-400 px-5 py-3 font-black text-black transition hover:bg-amber-300"
          >
            Admin
          </a>

        </div>
      </header>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        id="home"
        className="bg-[#102a43] text-white"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 md:py-14 lg:grid-cols-2 lg:gap-12 lg:py-16">

          <div>

            <div className="mb-5 flex items-center gap-4">

              <img
                src="/pm-shri-logo.jpeg.jpeg"
                alt="PM SHRI Logo"
                className="h-20 w-20 rounded-full bg-white object-contain p-2 shadow-lg ring-2 ring-amber-400/70"
              />

              <span className="rounded-full border border-amber-400 px-5 py-3 font-bold text-amber-300">
                PM SHRI School
              </span>

            </div>


            <h2 className="text-5xl font-black leading-[1.05] md:text-6xl lg:text-[68px]">

              Welcome to

              <span className="mt-2 block text-amber-400">
                PM SHRI
              </span>

              <span className="block text-amber-400">
                Adarsh
              </span>

              <span className="block text-amber-400">
                Vidyalaya
              </span>

            </h2>


            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              A CBSE-affiliated higher secondary school committed to academic
              excellence, holistic development and nurturing responsible,
              confident and future-ready learners.
            </p>


            <div className="mt-7 flex flex-wrap gap-4">

              <a
                href="#about"
                className="rounded-xl bg-amber-400 px-6 py-3.5 font-black text-black transition hover:bg-amber-300"
              >
                Explore School →
              </a>

              <a
                href="#achievements"
                className="rounded-xl border border-white/30 px-6 py-3.5 font-bold transition hover:bg-white/10"
              >
                Our Achievements
              </a>

            </div>


            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                🎓 Class 1–12
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                📘 CBSE
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                📅 Est. 2014
              </span>

            </div>

          </div>


          <div className="mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border-4 border-white/20 bg-white/5 shadow-2xl">

            <div className="aspect-[4/3] w-full overflow-hidden">

              <img
                src="/school-building-1.jpeg.jpeg"
                alt="PM SHRI Adarsh Vidyalaya Building"
                className="h-full w-full object-cover object-center transition duration-500 hover:scale-105"
              />

            </div>

            <div className="bg-black px-6 py-5">

              <h3 className="text-xl font-black md:text-2xl">
                PM SHRI Adarsh Vidyalaya
              </h3>

              <p className="mt-1 text-sm text-slate-300 md:text-base">
                Kaldi, Barkhetri, Nalbari, Assam
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          NOTICES
      ====================================================== */}

      <section className="mx-auto -mt-8 max-w-6xl px-5">

        <div className="rounded-3xl bg-white p-7 shadow-xl">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-600">
                IMPORTANT
              </span>

              <h2 className="mt-3 text-2xl font-black text-[#102a43]">
                📢 Important Notices
              </h2>

              <p className="mt-2 text-slate-500">
                Latest school notices and announcements.
              </p>

            </div>

            <a
              href="/admin/notices"
              className="rounded-xl bg-[#102a43] px-6 py-3 text-center font-bold text-white transition hover:bg-[#183b5c]"
            >
              Manage Notices →
            </a>

          </div>


          <div className="mt-7 space-y-4">

            {loading ? (

              <div className="rounded-2xl bg-slate-50 p-6 text-center text-slate-500">
                Loading notices...
              </div>

            ) : notices.length === 0 ? (

              <div className="rounded-2xl bg-slate-50 p-6 text-center text-slate-500">
                No notices available at the moment.
              </div>

            ) : (

              notices.map((notice, index) => (

                <article
                  key={`${notice.Title}-${index}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >

                  {notice.Type === "Important Notice" && (
                    <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-600">
                      IMPORTANT
                    </span>
                  )}

                  <h3 className="mt-2 text-xl font-black text-[#102a43]">
                    {notice.Title || "School Notice"}
                  </h3>

                  {notice.Date && (
                    <p className="mt-1 text-sm font-bold text-amber-600">
                      📅 {formatDate(notice.Date)}
                    </p>
                  )}

                  {notice.Description && (
                    <p className="mt-3 leading-7 text-slate-600">
                      {notice.Description}
                    </p>
                  )}

                  {notice["Image URL"] && (
                    <img
                      src={notice["Image URL"]}
                      alt={notice.Title || "Notice image"}
                      className="mt-4 max-h-72 w-full rounded-xl object-cover"
                    />
                  )}

                </article>

              ))

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT
      ====================================================== */}

      <section
        id="about"
        className="mx-auto max-w-7xl px-5 py-24"
      >

        <div className="grid gap-12 lg:grid-cols-2">

          <div>

            <p className="font-black uppercase tracking-widest text-amber-500">
              About Our School
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#102a43] md:text-5xl">
              Learning today,
              <br />
              leading tomorrow.
            </h2>

            <div className="mt-7 flex flex-wrap gap-3">

              <span className="rounded-full bg-blue-50 px-4 py-2 font-bold text-blue-700">
                Established 2014
              </span>

              <span className="rounded-full bg-green-50 px-4 py-2 font-bold text-green-700">
                CBSE Affiliated
              </span>

              <span className="rounded-full bg-amber-50 px-4 py-2 font-bold text-amber-700">
                PM SHRI School
              </span>

            </div>

          </div>


          <div className="text-lg leading-8 text-slate-600">

            <p>
              Established in 2014, our institution is a CBSE-affiliated
              higher secondary school committed to fostering academic
              excellence, holistic development and responsible,
              confident and future-ready learners.
            </p>

            <p className="mt-5">
              As a proud PM SHRI School, we endeavour to translate the
              vision of quality education into meaningful and transformative
              learning experiences.
            </p>

            <p className="mt-5">
              With a strength of 750+ students, the school has steadily
              evolved into a vibrant centre of learning.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          SECOND BUILDING
      ====================================================== */}

      <section className="bg-slate-100 py-20">

        <div className="mx-auto max-w-7xl px-5">

          <img
            src="/school-building-2.jpeg.jpeg"
            alt="Adarsh Vidyalaya Building"
            className="h-[450px] w-full rounded-3xl object-cover shadow-2xl"
          />

        </div>

      </section>


      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="bg-[#102a43] py-20 text-white">

        <div className="mx-auto grid max-w-7xl gap-8 px-5 text-center sm:grid-cols-2 lg:grid-cols-4">

          {[
            ["750+", "Students"],
            ["2014", "Established"],
            ["1–12", "Classes"],
            ["CBSE", "Affiliation"],
          ].map(([value, label]) => (

            <div key={label}>

              <p className="text-5xl font-black text-amber-400">
                {value}
              </p>

              <p className="mt-2 text-lg text-slate-300">
                {label}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          ACADEMICS
      ====================================================== */}

      <section
        id="academics"
        className="bg-slate-100 py-24"
      >

        <div className="mx-auto max-w-7xl px-5">

          <div className="text-center">

            <p className="font-black uppercase tracking-widest text-amber-500">
              Education
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#102a43]">
              Academic Information
            </h2>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-4">

            {[
              ["🎓", "Classes", "Class 1 to Class 12"],
              ["📘", "Board", "CBSE"],
              ["🌐", "Medium", "English"],
              ["⏰", "Timing", "9:00 AM – 2:50 PM"],
            ].map(([icon, title, description]) => (

              <div
                key={title}
                className="rounded-3xl bg-white p-7 text-center shadow"
              >

                <div className="text-4xl">
                  {icon}
                </div>

                <h3 className="mt-4 font-black">
                  {title}
                </h3>

                <p className="mt-2 text-slate-600">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          MISSION / VISION
      ====================================================== */}

      <section className="bg-white py-24">

        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-2">

          <div className="rounded-3xl bg-[#102a43] p-10 text-white">

            <div className="text-5xl">
              🎯
            </div>

            <h2 className="mt-6 text-3xl font-black text-amber-300">
              Our Mission
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              To provide inclusive, equitable and transformative education
              that nurtures academic excellence, creativity, critical
              thinking, character and lifelong learning.
            </p>

          </div>


          <div className="rounded-3xl bg-amber-50 p-10">

            <div className="text-5xl">
              🌟
            </div>

            <h2 className="mt-6 text-3xl font-black text-[#102a43]">
              Our Vision
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-700">
              To emerge as a centre of excellence in school education,
              nurturing intellectually curious, ethically grounded,
              socially responsible and future-ready learners.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          ACHIEVEMENTS - ADMIN DATA ONLY
      ====================================================== */}

      <section
        id="achievements"
        className="bg-white py-24"
      >

        <div className="mx-auto max-w-7xl px-5">

          <div className="text-center">

            <p className="font-black uppercase tracking-widest text-amber-500">
              Celebrating Success
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#102a43]">
              Our Achievements
            </h2>

            <p className="mt-4 text-slate-600">
              Achievements uploaded from Admin Panel appear here.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {loading ? (

              <div className="md:col-span-3 rounded-3xl bg-slate-50 p-10 text-center text-slate-500">
                Loading achievements...
              </div>

            ) : achievements.length === 0 ? (

              <div className="md:col-span-3 rounded-3xl bg-slate-50 p-10 text-center text-slate-500">
                No achievements available.
              </div>

            ) : (

              achievements.map((item, index) => (

                <article
                  key={`${item.Title}-${index}`}
                  className="overflow-hidden rounded-3xl bg-slate-50 shadow"
                >

                  {item["Image URL"] && (
                    <img
                      src={item["Image URL"]}
                      alt={item.Title || "Achievement"}
                      className="h-64 w-full object-cover"
                    />
                  )}

                  <div className="p-7">

                    <div className="text-4xl">
                      🏆
                    </div>

                    <h3 className="mt-4 text-xl font-black text-[#102a43]">
                      {item.Title || "Achievement"}
                    </h3>

                    {item.Date && (
                      <p className="mt-1 text-sm font-bold text-amber-600">
                        📅 {formatDate(item.Date)}
                      </p>
                    )}

                    {item.Description && (
                      <p className="mt-3 text-slate-600">
                        {item.Description}
                      </p>
                    )}

                  </div>

                </article>

              ))

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          FACILITIES - ADMIN DATA ONLY
      ====================================================== */}

      <section
        id="facilities"
        className="bg-slate-100 py-24"
      >

        <div className="mx-auto max-w-7xl px-5">

          <div className="text-center">

            <p className="font-black uppercase tracking-widest text-amber-500">
              School Infrastructure
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#102a43]">
              Our Facilities
            </h2>

            <p className="mt-4 text-slate-600">
              Facilities uploaded from Admin Panel appear here.
            </p>

          </div>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {loading ? (

              <div className="sm:col-span-2 lg:col-span-3 rounded-3xl bg-white p-10 text-center text-slate-500">
                Loading facilities...
              </div>

            ) : facilities.length === 0 ? (

              <div className="sm:col-span-2 lg:col-span-3 rounded-3xl bg-white p-10 text-center text-slate-500">
                No facilities uploaded yet.
              </div>

            ) : (

              facilities.map((item, index) => (

                <article
                  key={`${item.Title}-${index}`}
                  className="overflow-hidden rounded-3xl bg-white shadow"
                >

                  {item["Image URL"] && (
                    <img
                      src={item["Image URL"]}
                      alt={item.Title || "Facility"}
                      className="h-56 w-full object-cover"
                    />
                  )}

                  <div className="p-7">

                    <div className="text-4xl">
                      🏫
                    </div>

                    <h3 className="mt-4 text-xl font-black text-[#102a43]">
                      {item.Title || "Facility"}
                    </h3>

                    {item.Description && (
                      <p className="mt-2 leading-7 text-slate-600">
                        {item.Description}
                      </p>
                    )}

                  </div>

                </article>

              ))

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          GALLERY - ADMIN DATA ONLY
      ====================================================== */}

      <section
        id="gallery"
        className="bg-white py-24"
      >

        <div className="mx-auto max-w-7xl px-5">

          <div className="text-center">

            <p className="font-black uppercase tracking-widest text-amber-500">
              School Life
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#102a43]">
              School Gallery
            </h2>

            <p className="mt-4 text-slate-600">
              Gallery photos uploaded from Admin Panel appear here.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {loading ? (

              <div className="md:col-span-2 lg:col-span-3 rounded-3xl bg-slate-50 p-10 text-center text-slate-500">
                Loading gallery...
              </div>

            ) : gallery.length === 0 ? (

              <div className="md:col-span-2 lg:col-span-3 rounded-3xl bg-slate-50 p-10 text-center text-slate-500">
                No gallery photos uploaded yet.
              </div>

            ) : (

              gallery.map((item, index) => (

                <article
                  key={`${item.Title}-${index}`}
                  className="overflow-hidden rounded-3xl bg-[#102a43] shadow-xl"
                >

                  {item["Image URL"] && (
                    <img
                      src={item["Image URL"]}
                      alt={item.Title || "Gallery photo"}
                      className="h-72 w-full object-cover"
                    />
                  )}

                  <div className="p-5 text-white">

                    <h3 className="text-xl font-black">
                      {item.Title || "School Gallery"}
                    </h3>

                    {item.Description && (
                      <p className="mt-2 text-sm text-slate-300">
                        {item.Description}
                      </p>
                    )}

                    {item.Date && (
                      <p className="mt-2 text-sm font-bold text-amber-300">
                        📅 {formatDate(item.Date)}
                      </p>
                    )}

                  </div>

                </article>

              ))

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          STAFF - ADMIN DATA ONLY
      ====================================================== */}

      <section className="bg-slate-100 py-24">

        <div className="mx-auto max-w-7xl px-5">

          <div className="text-center">

            <p className="font-black uppercase tracking-widest text-amber-500">
              School Team
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#102a43]">
              Teachers & Staff
            </h2>

            <p className="mt-4 text-slate-600">
              Staff profiles uploaded from Admin Panel appear here.
            </p>

          </div>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {loading ? (

              <div className="sm:col-span-2 lg:col-span-4 rounded-3xl bg-white p-10 text-center text-slate-500">
                Loading staff...
              </div>

            ) : staff.length === 0 ? (

              <div className="sm:col-span-2 lg:col-span-4 rounded-3xl bg-white p-10 text-center text-slate-500">
                No staff profiles uploaded yet.
              </div>

            ) : (

              staff.map((item, index) => (

                <article
                  key={`${item.Title}-${index}`}
                  className="overflow-hidden rounded-3xl bg-white shadow"
                >

                  {item["Image URL"] ? (

                    <img
                      src={item["Image URL"]}
                      alt={item.Title || "Teacher"}
                      className="h-64 w-full object-cover"
                    />

                  ) : (

                    <div className="flex h-64 items-center justify-center bg-slate-200 text-6xl">
                      👨‍🏫
                    </div>

                  )}


                  <div className="p-6">

                    <h3 className="text-xl font-black text-[#102a43]">
                      {item.Title || "Teacher / Staff"}
                    </h3>

                    {item.Description && (
                      <p className="mt-2 text-slate-600">
                        {item.Description}
                      </p>
                    )}

                  </div>

                </article>

              ))

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          EVENTS - ADMIN DATA ONLY
      ====================================================== */}

      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-5">

          <div className="text-center">

            <p className="font-black uppercase tracking-widest text-amber-500">
              School Activities
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#102a43]">
              Events
            </h2>

            <p className="mt-4 text-slate-600">
              Events uploaded from Admin Panel appear here.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {loading ? (

              <div className="md:col-span-2 lg:col-span-3 rounded-3xl bg-slate-50 p-10 text-center text-slate-500">
                Loading events...
              </div>

            ) : events.length === 0 ? (

              <div className="md:col-span-2 lg:col-span-3 rounded-3xl bg-slate-50 p-10 text-center text-slate-500">
                No events uploaded yet.
              </div>

            ) : (

              events.map((item, index) => (

                <article
                  key={`${item.Title}-${index}`}
                  className="overflow-hidden rounded-3xl bg-slate-50 shadow"
                >

                  {item["Image URL"] && (
                    <img
                      src={item["Image URL"]}
                      alt={item.Title || "Event"}
                      className="h-56 w-full object-cover"
                    />
                  )}

                  <div className="p-7">

                    <div className="text-4xl">
                      🎉
                    </div>

                    <h3 className="mt-4 text-xl font-black text-[#102a43]">
                      {item.Title || "School Event"}
                    </h3>

                    {item.Date && (
                      <p className="mt-1 text-sm font-bold text-amber-600">
                        📅 {formatDate(item.Date)}
                      </p>
                    )}

                    {item.Description && (
                      <p className="mt-3 text-slate-600">
                        {item.Description}
                      </p>
                    )}

                  </div>

                </article>

              ))

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          JOBS - ADMIN DATA ONLY
      ====================================================== */}

      <section
        id="jobs"
        className="bg-[#102a43] py-24 text-white"
      >

        <div className="mx-auto max-w-7xl px-5 text-center">

          <p className="font-black uppercase tracking-widest text-amber-400">
            Career Opportunities
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Latest Jobs
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            Job uploads from Admin Panel appear here.
          </p>


          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">

            {loading ? (

              <div className="md:col-span-2 rounded-3xl bg-white p-10 text-slate-500">
                Loading jobs...
              </div>

            ) : jobs.length === 0 ? (

              <div className="md:col-span-2 rounded-3xl bg-white p-10 text-slate-600">
                No current job updates.
              </div>

            ) : (

              jobs.map((item, index) => (

                <article
                  key={`${item.Title}-${index}`}
                  className="overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl"
                >

                  {item["Image URL"] && (
                    <img
                      src={item["Image URL"]}
                      alt={item.Title || "Job"}
                      className="h-56 w-full object-cover"
                    />
                  )}

                  <div className="p-7 text-left">

                    <div className="text-4xl">
                      💼
                    </div>

                    <h3 className="mt-4 text-2xl font-black">
                      {item.Title || "Job Vacancy"}
                    </h3>

                    {item.Date && (
                      <p className="mt-1 text-sm font-bold text-amber-600">
                        📅 {formatDate(item.Date)}
                      </p>
                    )}

                    {item.Description && (
                      <p className="mt-3 leading-7 text-slate-600">
                        {item.Description}
                      </p>
                    )}

                  </div>

                </article>

              ))

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          DOCUMENTS - ADMIN DATA ONLY
      ====================================================== */}
{/* =====================================================
    MANDATORY PUBLIC DISCLOSURE
====================================================== */}

<section
  id="disclosure"
  className="bg-slate-100 py-24"
>
  <div className="mx-auto max-w-7xl px-5">

    <div className="text-center">

      <p className="font-black uppercase tracking-widest text-amber-500">
        School Disclosure
      </p>

      <h2 className="mt-3 text-4xl font-black text-[#102a43]">
        Mandatory Public Disclosure
      </h2>

      <p className="mt-4 text-slate-600">
        Important school information and mandatory public disclosure document.
      </p>

    </div>

    <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">

      {loading ? (

        <div className="md:col-span-2 rounded-3xl bg-white p-10 text-center text-slate-500">
          Loading disclosure document...
        </div>

      ) : documents.length === 0 ? (

        <div className="md:col-span-2 rounded-3xl bg-white p-10 text-center text-slate-500">
          Mandatory Public Disclosure document has not been uploaded yet.
        </div>

      ) : (

        documents.map((item, index) => (

          <article
            key={`${item.Title}-${index}`}
            className="rounded-3xl bg-white p-7 shadow"
          >

            <div className="text-4xl">
              📄
            </div>

            <h3 className="mt-4 text-xl font-black text-[#102a43]">
              Mandatory Public Disclosure
            </h3>

            {item.Description && (
              <p className="mt-2 text-slate-600">
                {item.Description}
              </p>
            )}

            {item.Date && (
              <p className="mt-2 text-sm font-bold text-amber-600">
                {formatDate(item.Date)}
              </p>
            )}

            {item["Image URL"] && (
              <a
                href={item["Image URL"]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-xl bg-[#102a43] px-5 py-3 font-bold text-white transition hover:bg-[#183b5c]"
              >
                Open Mandatory Public Disclosure →
              </a>
            )}

          </article>

        ))

      )}

    </div>

  </div>
      </section>


      {/* =====================================================
          CONTACT
      ====================================================== */}

      <section
        id="contact"
        className="bg-slate-50 py-24"
      >

        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2">

          <div>

            <p className="font-black uppercase tracking-widest text-amber-500">
              Get In Touch
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#102a43]">
              Contact Our School
            </h2>


            <div className="mt-8 space-y-6">

              <div>

                <p className="text-xs font-black uppercase text-slate-400">
                  Address
                </p>

                <p className="mt-2 text-lg leading-8">
                  Vill- Kaldi, PO- Bartala,
                  <br />
                  PS- Mukalmua, Nalbari,
                  <br />
                  Assam – 781126
                </p>

              </div>


              <div>

                <p className="text-xs font-black uppercase text-slate-400">
                  Phone
                </p>

                <a
                  href="tel:7577844670"
                  className="mt-2 block text-lg font-bold text-[#102a43]"
                >
                  +91 75778 44670
                </a>

              </div>


              <div>

                <p className="text-xs font-black uppercase text-slate-400">
                  Email
                </p>

                <a
                  href="mailto:avmskaldi2@gmail.com"
                  className="mt-2 block text-lg font-bold text-[#102a43]"
                >
                  avmskaldi2@gmail.com
                </a>

              </div>

            </div>

          </div>


          <div className="overflow-hidden rounded-3xl shadow-xl">

            <iframe
              src="https://www.google.com/maps?q=Vill-Kaldi,+PO-Bartala,+PS-Mukalmua,+Nalbari,+Assam+781126&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              className="border-0"
              title="School Location"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          SOCIAL MEDIA
      ====================================================== */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-7xl px-5 text-center">

          <p className="font-black uppercase tracking-widest text-amber-500">
            Stay Connected
          </p>

          <h2 className="mt-3 text-3xl font-black text-[#102a43]">
            Follow Our School
          </h2>


          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <a
              href="https://www.facebook.com/share/1daPoYQp2H/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
            >
              Facebook
            </a>


            <a
              href="https://www.instagram.com/pmshriadarshvidyalaya.official/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-pink-500 px-6 py-3 font-bold text-white"
            >
              Instagram
            </a>


            <a
              href="https://youtube.com/@pmshriadarshvidyalayabarkhetri"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white"
            >
              YouTube
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-[#071827] py-10 text-white">

        <div className="mx-auto max-w-7xl px-5">

          <div className="flex flex-col justify-between gap-8 md:flex-row">

            <div className="flex items-center gap-3">

              <img
                src="/school-logo.jpeg.jpeg"
                alt="School Logo"
                className="h-14 w-14 rounded-full bg-white object-contain p-1 shadow-md"
              />

              <div>

                <h3 className="text-xl font-black">
                  PM SHRI Adarsh Vidyalaya
                </h3>

                <p className="text-sm text-slate-400">
                  Barkhetri, Nalbari, Assam
                </p>

              </div>

            </div>


            <div className="text-left md:text-right">

              <p className="text-xs text-slate-500">
                Website Developed By
              </p>

              <h3 className="mt-1 text-xl font-black">
                Bikash AI
              </h3>

              <a
                href="https://www.instagram.com/bikashai1/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-xl bg-pink-500 px-5 py-3 font-bold"
              >
                📷 Contact on Instagram
              </a>

            </div>

          </div>


          <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
            © 2026 PM SHRI Adarsh Vidyalaya. All Rights Reserved.
          </div>

        </div>

      </footer>

    </main>
  );
}