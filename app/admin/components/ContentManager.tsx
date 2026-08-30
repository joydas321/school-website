"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  API_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  SectionConfig,
} from "../config";

type ContentItem = {
  Type?: string;
  Title?: string;
  Description?: string;
  Date?: string;
  "Image URL"?: string;
};

type Props = {
  config: SectionConfig;
};

export default function ContentManager({
  config,
}: Props) {
  const [items, setItems] = useState<ContentItem[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [important, setImportant] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editing, setEditing] =
    useState<ContentItem | null>(null);

  const [message, setMessage] = useState("");

  // =========================
  // LOAD DATA
  // =========================

  async function loadData() {
    try {
      setLoading(true);

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

      if (!Array.isArray(data)) {
        setItems([]);
        return;
      }

      const filtered =
        data.filter(
          (item: ContentItem) => {
            const itemType =
              String(item.Type || "")
                .trim()
                .toLowerCase();

            const currentType =
              String(config.type || "")
                .trim()
                .toLowerCase();

            if (
              currentType === "notice" &&
              (
                itemType === "notice" ||
                itemType === "important notice"
              )
            ) {
              return true;
            }

            return itemType === currentType;
          }
        );

      setItems(filtered);
    } catch (error) {
      console.error(error);

      setMessage(
        "❌ Failed to load data."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [config.type]);

  // =========================
  // CLOUDINARY UPLOAD
  // =========================

  async function handleFileUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setUploading(true);
    setMessage(
      "⏳ Uploading file..."
    );

    try {
      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "upload_preset",
        CLOUDINARY_UPLOAD_PRESET
      );

      const response =
        await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
          "Cloudinary upload failed."
        );
      }

      setImageUrl(
        result.secure_url || ""
      );

      setFileName(
        file.name
      );

      setMessage(
        "✅ File uploaded successfully."
      );
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? `❌ ${error.message}`
          : "❌ Upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  // =========================
  // RESET
  // =========================

  function resetForm() {
    setTitle("");
    setDescription("");
    setDate("");
    setImportant(false);
    setImageUrl("");
    setFileName("");
    setEditing(null);
    setMessage("");
  }

  // =========================
  // SAVE
  // =========================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!title.trim()) {
      setMessage(
        "❌ Please enter a title."
      );
      return;
    }

    if (!description.trim()) {
      setMessage(
        "❌ Please enter details."
      );
      return;
    }

    if (
      config.date &&
      !date
    ) {
      setMessage(
        "❌ Please select a date."
      );
      return;
    }

    setLoading(true);
    setMessage("⏳ Saving...");

    const contentType =
      config.type === "Notice" &&
      important
        ? "Important Notice"
        : config.type;

    const content = {
      Type: contentType,
      Title: title.trim(),
      Description:
        description.trim(),
      Date:
        config.date
          ? date
          : "",
      "Image URL":
        imageUrl || "",
    };

    try {
      if (editing) {
        await fetch(
          API_URL,
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type":
                "text/plain;charset=utf-8",
            },
            body: JSON.stringify({
              action: "update",

              old: {
                Type:
                  editing.Type || "",
                Title:
                  editing.Title || "",
                Date:
                  editing.Date || "",
              },

              ...content,
            }),
          }
        );

        setMessage(
          "✅ Content updated successfully."
        );
      } else {
        await fetch(
          API_URL,
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type":
                "text/plain;charset=utf-8",
            },
            body: JSON.stringify(
              content
            ),
          }
        );

        setMessage(
          "✅ Content published successfully."
        );
      }

      resetForm();

      setTimeout(
        loadData,
        1200
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "❌ Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // EDIT
  // =========================

  function handleEdit(
    item: ContentItem
  ) {
    setEditing(item);

    setTitle(
      item.Title || ""
    );

    setDescription(
      item.Description || ""
    );

    setDate(
      item.Date || ""
    );

    setImageUrl(
      item["Image URL"] || ""
    );

    setFileName("");

    setImportant(
      item.Type ===
        "Important Notice"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================
  // DELETE
  // =========================

  async function handleDelete(
    item: ContentItem
  ) {
    const confirmed =
      window.confirm(
        `Delete "${item.Title}"?`
      );

    if (!confirmed)
      return;

    try {
      setLoading(true);

      setMessage(
        "⏳ Deleting..."
      );

      await fetch(
        API_URL,
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            action: "delete",
            Type:
              item.Type || "",
            Title:
              item.Title || "",
            Date:
              item.Date || "",
          }),
        }
      );

      setMessage(
        "✅ Deleted successfully."
      );

      setTimeout(
        loadData,
        1200
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "❌ Delete failed."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // UI
  // =========================

  return (
    <main className="min-h-screen bg-slate-100">

      <header className="bg-[#102a43] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-8">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
              School Management
            </p>

            <h1 className="mt-1 text-2xl font-black">
              {config.title}
            </h1>

            <p className="mt-1 text-sm text-slate-300">
              PM SHRI Adarsh Vidyalaya, Barkhetri
            </p>
          </div>

          <a
            href="/admin"
            className="rounded-xl border border-white/20 px-5 py-2 text-sm font-bold hover:bg-white/10"
          >
            ← Admin Dashboard
          </a>

        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10">

        <section className="rounded-3xl bg-white p-7 shadow-xl md:p-10">

          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-500">
            {editing
              ? "Edit Content"
              : "Create Content"}
          </p>

          <h2 className="mt-3 text-3xl font-black text-[#102a43]">
            {editing
              ? "Edit Content"
              : "Add New Content"}
          </h2>

          <p className="mt-2 text-slate-500">
            {config.description}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* TITLE */}
            <div>
              <label className="mb-2 block font-bold text-[#102a43]">
                {config.type === "Teacher"
                  ? "Name / Profile Title *"
                  : "Title *"}
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder={
                  config.type === "Teacher"
                    ? "Mr. ABC — Mathematics Teacher"
                    : "Enter title"
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* DATE */}
            {config.date && (
              <div>
                <label className="mb-2 block font-bold text-[#102a43]">
                  Date *
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>
            )}

            {/* IMPORTANT */}
            {config.important && (
              <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <input
                  type="checkbox"
                  checked={important}
                  onChange={(e) =>
                    setImportant(
                      e.target.checked
                    )
                  }
                  className="h-5 w-5"
                />

                <span className="font-bold text-[#102a43]">
                  🔴 Mark as Important Notice
                </span>

              </label>
            )}

            {/* DESCRIPTION */}
            <div>
              <label className="mb-2 block font-bold text-[#102a43]">
                Details / Description *
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Write complete details here..."
                rows={7}
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* FILE */}
            {config.photo && (
              <div>
                <label className="mb-2 block font-bold text-[#102a43]">
                  {config.photoLabel}
                </label>

                <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6">

                  <input
                    type="file"
                    accept={
                      config.accept ||
                      "image/*"
                    }
                    onChange={
                      handleFileUpload
                    }
                    disabled={uploading}
                    className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-[#102a43] file:px-5 file:py-3 file:font-bold file:text-white"
                  />

                  {uploading && (
                    <p className="mt-4 font-bold text-amber-600">
                      ⏳ Uploading...
                    </p>
                  )}

                  {fileName &&
                    !uploading && (
                      <p className="mt-4 font-bold text-green-600">
                        ✅ {fileName}
                      </p>
                    )}

                  {imageUrl && (
                    <div className="mt-5">
                      <p className="mb-3 font-bold text-green-600">
                        ✅ Uploaded
                      </p>

                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="max-h-64 rounded-2xl object-cover shadow-md"
                      />
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* MESSAGE */}
            {message && (
              <div className="rounded-2xl bg-slate-50 p-4 text-center font-bold">
                {message}
              </div>
            )}

            {/* BUTTON */}
            <div className="flex flex-col gap-3 md:flex-row">

              <button
                type="submit"
                disabled={
                  loading ||
                  uploading
                }
                className="flex-1 rounded-2xl bg-[#102a43] px-6 py-4 text-lg font-black text-white hover:bg-[#183d5d] disabled:opacity-60"
              >
                {loading
                  ? "Saving..."
                  : editing
                    ? "✏️ Update Content"
                    : "🚀 Publish Content"}
              </button>

              {editing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-slate-300 px-7 py-4 font-bold"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </section>

        {/* EXISTING */}
        <section className="mt-10 rounded-3xl bg-white p-7 shadow-xl md:p-10">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-black uppercase tracking-wider text-amber-500">
                Published Content
              </p>

              <h2 className="mt-2 text-2xl font-black text-[#102a43]">
                Existing Content
              </h2>
            </div>

            <span className="rounded-full bg-slate-100 px-5 py-2 font-black">
              {items.length}
            </span>

          </div>

          <div className="mt-7 space-y-4">

            {items.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-10 text-center text-slate-500">
                No content published yet.
              </div>
            ) : (
              items.map(
                (item, index) => (
                  <article
                    key={`${item.Title}-${index}`}
                    className="rounded-2xl border border-slate-200 p-5"
                  >

                    <div className="flex flex-col gap-5 md:flex-row">

                      {item["Image URL"] && (
                        <img
                          src={item["Image URL"]}
                          alt={
                            item.Title ||
                            "Content"
                          }
                          className="h-32 w-full rounded-2xl object-cover md:w-44"
                        />
                      )}

                      <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-lg font-black text-[#102a43]">
                            {item.Title}
                          </h3>

                          {item.Type ===
                            "Important Notice" && (
                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-600">
                              IMPORTANT
                            </span>
                          )}

                        </div>

                        {item.Date && (
                          <p className="mt-2 font-bold text-amber-600">
                            📅 {item.Date}
                          </p>
                        )}

                        <p className="mt-3 whitespace-pre-line text-slate-600">
                          {item.Description}
                        </p>

                        <div className="mt-5 flex gap-3">

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(item)
                            }
                            className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-bold text-white"
                          >
                            ✏️ Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(item)
                            }
                            className="rounded-xl bg-red-600 px-5 py-2 text-sm font-bold text-white"
                          >
                            🗑️ Delete
                          </button>

                        </div>

                      </div>

                    </div>

                  </article>
                )
              )
            )}

          </div>

        </section>

      </div>

      <footer className="bg-[#071827] py-6 text-center text-sm text-slate-400">

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