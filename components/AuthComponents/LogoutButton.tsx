'use client';

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabase";



const LogoutButton = ( ) =>{
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('login');


const handleLogout = async ()=>{
    const {error} = await supabase.auth.signOut();
    if (error){
        alert(error.message);
    } else{
        router.push(`/${locale}/login`);
    }
};

  return (
    <button
      onClick={handleLogout}
      className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition cursor-pointer"
    >
      {t('logout')}
    </button>
  );
};

export default LogoutButton;