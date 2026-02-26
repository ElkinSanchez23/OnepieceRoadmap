import React from "react";
import ButtonRedirect from "@/components/GeneralComponents/Button";
import Image from "next/image";

type SagaBoxProps = {
  title?: string;
  image: string;
  description: string;
  buttonText: string;
  route: string;
};

export const SagaBox: React.FC<SagaBoxProps> = ({
  title,
  image,
  description,
  buttonText,
  route,
}) => {
  return (
    <div
      className="bg-yellow-100 border border-yellow-400 rounded-lg shadow-lg p-4 w-[300px] text-black flex flex-col items-center"
      style={{ boxShadow: "inset 0 0 20px #7b4c20" }}
    >
      {title && (
        <h2
          className="text-lg font-bold mb-2 text-center"
          aria-label={`Título de la saga: ${title}`}
        >
          {title}
        </h2>
      )}

      <div className="w-full h-48 overflow-hidden rounded mb-3">
        <Image
          src={image}
          alt={title ? `Imagen de la saga ${title}` : "Imagen de la saga"}
          width={300} 
          height={192}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded"
          style={{ objectFit: "cover" }}
        />
      </div>

      <p
        className="text-sm mb-4 text-center"
        aria-label="Descripción de la saga"
      >
        {description}
      </p>

      <ButtonRedirect
        text={buttonText}
        route={route}
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500 transition"
      />
    </div>
  );
};
