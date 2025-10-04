import React from "react";

type Props = {
  value: number; // 0-5
  onChange?: (v: number) => void;
  size?: "sm" | "md" | "lg";
};

// PUBLIC_INTERFACE
export default function RatingStars({ value, onChange, size = "md" }: Props) {
  const stars = [1, 2, 3, 4, 5];
  const px = size === "lg" ? 28 : size === "sm" ? 16 : 22;

  const handle = (idx: number) => {
    if (!onChange) return;
    onChange(idx);
  };

  return (
    <div className="flex items-center" aria-label={`Rating ${value} of 5`}>
      {stars.map((s: number) => {
        const active = value >= s;
        return (
          <button
            key={s}
            type="button"
            className="p-0.5"
            onClick={() => handle(s)}
            aria-label={`Rate ${s}`}
          >
            <svg
              width={px}
              height={px}
              viewBox="0 0 24 24"
              fill={active ? "url(#grad)" : "none"}
              stroke={active ? "transparent" : "currentColor"}
              className={active ? "text-primary" : "text-white/40"}
            >
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <path
                d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.168L12 18.897l-7.336 3.868 1.402-8.168L.132 9.21l8.2-1.192z"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
