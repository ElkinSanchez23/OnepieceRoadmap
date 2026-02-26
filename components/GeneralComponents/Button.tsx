"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React from "react";
import clsx from "clsx";

type ButtonRedirectProps = {
  text: string;
  route: string;
  className?: string;
  onNavigate?: () => void;
};

const ButtonRedirect: React.FC<ButtonRedirectProps> = ({
  text,
  route,
  className,
  onNavigate,
}) => {
  const router = useRouter();
  const locale = useLocale();

  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }

    const fullRoute = `/${locale}/${route.replace(/^\/+/, "")}`;
    router.push(fullRoute);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "bg-red-800 cursor-pointer text-white font-semibold text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-md transition-colors duration-300 hover:bg-red-600 w-full sm:w-auto",
        className
      )}
    >
      {text}
    </button>
  );
};

export default ButtonRedirect;
