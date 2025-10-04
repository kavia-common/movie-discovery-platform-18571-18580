type Props = {
  youtubeKey?: string;
};

// PUBLIC_INTERFACE
export default function TrailerPlayer({ youtubeKey }: Props) {
  const base = import.meta.env.VITE_YOUTUBE_EMBED_BASE || "https://www.youtube.com/embed/";
  if (!youtubeKey) {
    return (
      <div className="card p-6 text-white/70">
        Trailer not available
      </div>
    );
  }
  const src = `${base}${youtubeKey}`;
  return (
    <div className="relative w-full pt-[56.25%] overflow-hidden rounded-2xl border border-white/10">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={src}
        title="Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
