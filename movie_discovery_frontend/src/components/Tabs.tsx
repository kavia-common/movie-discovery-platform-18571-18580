import { NavLink } from "react-router-dom";

type Tab = { to: string; label: string };

// PUBLIC_INTERFACE
export default function Tabs({ tabs }: { tabs: Tab[] }) {
  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          className={({ isActive }) =>
            `tab ${isActive ? "bg-white/10" : "hover:bg-white/5"}`
          }
        >
          {t.label}
        </NavLink>
      ))}
    </div>
  );
}
