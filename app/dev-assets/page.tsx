import fs from "fs";
import path from "path";
import Link from "next/link";

export const metadata = {
  title: "Dev Assets Gallery - Internal Tool",
};

export default async function DevAssetsPage() {
  const imagesDir = path.join(process.cwd(), "public", "images");
  let files: string[] = [];

  try {
    const dirEntries = await fs.promises.readdir(imagesDir, { withFileTypes: true });
    files = dirEntries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  } catch (err) {
    console.error("Error reading public/images:", err);
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 sm:p-10 font-sans">
      <header className="max-w-7xl mx-auto mb-8 border-b border-slate-700 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-amber-400 font-mono">
            /dev-assets &mdash; Gallery Review
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-mono">
            Total files in <code className="text-emerald-400">public/images/</code>: {files.length}
          </p>
        </div>
        <Link
          href="/"
          className="text-xs font-mono px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-200 transition-colors"
        >
          &larr; Kembali ke Home
        </Link>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {files.map((file) => {
            const isVideo = file.endsWith(".webm") || file.endsWith(".mp4");
            const src = `/images/${file}`;

            return (
              <div
                key={file}
                className="flex flex-col bg-slate-800 border border-slate-700 rounded p-2.5 hover:border-amber-400/60 transition-all group"
              >
                {/* Image Container (max-width 200px) */}
                <div className="w-full max-w-[200px] mx-auto aspect-square bg-slate-950 flex items-center justify-center overflow-hidden rounded mb-2 border border-slate-700/50">
                  {isVideo ? (
                    <video
                      src={src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={src}
                      alt={file}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                  )}
                </div>

                {/* Filename & Link */}
                <div className="mt-auto pt-1">
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] text-slate-300 hover:text-amber-300 break-all leading-snug line-clamp-2 block"
                    title={file}
                  >
                    {file}
                  </a>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>{file.split(".").pop()?.toUpperCase()}</span>
                    <a
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-slate-400"
                    >
                      Buka &nearr;
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
