"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import ButtonRedirect from "./button";

function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onOutsideClick: () => void,
  active = true
) {
  useEffect(() => {
    if (!active) return;
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onOutsideClick, active]);
}

const Icon = ({ isOpen }: { isOpen: boolean }) => {
  if (isOpen) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  );
};

export const BurguerDespegable = () => {
  const t = useTranslations("menu");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);
  useClickOutside(dropdownRef, closeDropdown, isOpen);

  const buttons = [
    { labelKey: "home", route: "/home" },
    { labelKey: "map", route: "/map" },
    { labelKey: "chooseSaga", route: "/sagas" },
    { labelKey: "optionB", route: "/plans" },
    { labelKey: "mugiwaras", route: "/characters" },
  ];

  const currentBasePath =
    pathname && params.lang
      ? pathname.replace(`/${params.lang}`, "") || "/"
      : pathname;
  const filteredButtons = buttons.filter(
    (btn) => btn.route !== currentBasePath
  );

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="rounded-full w-16 h-16 flex items-center justify-center bg-red-800 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black shadow-lg transition-all duration-150 ease-in-out cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Icon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div
          className="origin-bottom absolute w-64 rounded-md shadow-xl bg-gray-50 p-2 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 mb-2"
          style={{ bottom: "100%", right: 0 }}
        >
          <div className="flex flex-col">
            {filteredButtons.map(({ labelKey, route }) => (
              <ButtonRedirect
                key={route}
                text={t(labelKey)}
                route={route}
                onNavigate={closeDropdown}
                className="bg-red-700 text-white px-4 py-3 my-1 rounded-md hover:bg-red-600 cursor-pointer text-center text-base shadow w-full"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
