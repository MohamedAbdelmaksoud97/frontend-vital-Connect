import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";

/* Context used to close dropdown from inside items */
const DropdownContext = createContext({ close: () => {} });

export default function Dropdown({ button, children, align = "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on click outside or ESC
  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };

    const onKey = (e) => e.key === "Escape" && setOpen(false);

    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Toggle button */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {button}
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          role="menu"
          className={`absolute z-50 mt-2 min-w-52 rounded-2xl border border-gray-200 bg-white p-1 shadow-xl dark:border-gray-800 dark:bg-gray-900 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {/* Provide close() to DropdownItem */}
          <DropdownContext.Provider value={{ close: () => setOpen(false) }}>
            {children}
          </DropdownContext.Provider>
        </div>
      )}
    </div>
  );
}

/* Dropdown item */
export function DropdownItem({ onClick, children, icon, danger = false }) {
  const { close } = useContext(DropdownContext);

  return (
    <button
      role="menuitem"
      onClick={() => {
        onClick?.(); // Run original action
        close(); // Close dropdown
      }}
      className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
        danger ? "text-red-600" : "text-gray-800 dark:text-gray-100"
      }`}
    >
      {icon && (
        <span className="inline-flex h-4 w-4 items-center justify-center">
          {icon}
        </span>
      )}
      <span className="truncate">{children}</span>
    </button>
  );
}

/* Divider */
export function DropdownSeparator() {
  return <div className="my-1 h-px bg-gray-200 dark:bg-gray-800" />;
}
