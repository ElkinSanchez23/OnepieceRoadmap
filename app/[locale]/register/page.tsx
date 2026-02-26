import React from "react";
import Background from "@/components/generalComponents/background";
import GeneralOnepiece from "@/assets/generalImages/one_Piece.png";
import RegisterForm from "@/components/authComponents/registerForm";

const RegisterPage = () => {
  return (
    <Background image={GeneralOnepiece}>
      <main
        className="flex justify-center items-center h-screen"
        aria-labelledby="register-heading"
      >
        <div className="w-full max-w-md p-4">
          <RegisterForm />
        </div>
      </main>
    </Background>
  );
};

export default RegisterPage;
