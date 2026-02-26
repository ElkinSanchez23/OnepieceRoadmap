"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import InputField from "./inputField";
import { supabase } from "@/services/supabase";
const LoginForm = () => {
  const t = useTranslations("login");
  const locale = useLocale();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    console.log("Login result:", data, error);
    if (error) {
      setError(error.message || t("invalidCredentials"));
    } else {
      router.push(`/${locale}/home`);
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {t("title")}
      </h2>

      <div className="space-y-4">
        <InputField
          id="email"
          label={t("username")}
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          id="password"
          label={t("password")}
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mt-4">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-red-700 cursor-pointer text-white px-6 py-3 rounded-lg mt-6 w-full hover:bg-red-800 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? t("loading") : t("button")}
      </button>
    </form>
  );
};

export default LoginForm;
