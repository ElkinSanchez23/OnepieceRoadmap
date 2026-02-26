'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import InputField from "./inputField";
import { supabase } from "@/services/supabase";

const RegisterForm = () => {
  const  t  = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    alert(t('login.passwordMismatch'));
    return;
  }

  const { error } = await supabase.auth.signUp({
    email: formData.username,
    password: formData.password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert(t('register.registered'));
    router.push(`/${locale}/login`);
  }
};
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-300 transition duration-300 ease-in-out hover:shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-black-700">
        {t("register.title")}
      </h2>

      <InputField
        id="username"
        label={t("login.username")}
        value={formData.username}
        onChange={handleChange}
      />
      <InputField
        id="password"
        label={t("login.password")}
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <InputField
        id="confirmPassword"
        label={t("register.repeatPassword")}
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      {formData.password !== formData.confirmPassword && (
        <p className="text-sm text-red-600 mt-1">
          {t("login.passwordMismatch")}
        </p>
      )}

      <button
        type="submit"
        className="bg-red-800 cursor-pointer text-white px-8 py-2 rounded-lg font-semibold tracking-wide shadow-md hover:bg-red-600 hover:scale-105 transform transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-600/50 w-full mt-4"
      >
        {t("register.button")}
      </button>
    </form>
  );
};

export default RegisterForm;
