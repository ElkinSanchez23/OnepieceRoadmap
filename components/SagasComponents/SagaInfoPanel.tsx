import { ReactNode } from "react";
import Image from "next/image";

type SagaInfoPanelProps = {
  title: string;
  text: string;
  imageUrl?: string;
  bottomImageUrl?: string;
  children?: ReactNode;
};

export const SagaInfoPanel = ({
  title,
  text,
  imageUrl,
  bottomImageUrl,
  children,
}: SagaInfoPanelProps) => {
  return (
    <section
      className="bg-yellow-100 border border-yellow-400 rounded-lg shadow-lg p-6 w-[950px] h-[650px] text-brown-800 overflow-auto"
      style={{ boxShadow: "inset 0 0 30px #7b4c20" }}
      aria-labelledby="saga-title"
    >
      {imageUrl && (
        <div className="relative mb-4 mx-auto w-40 h-40">
          <Image
            src={imageUrl}
            alt={`Imagen representativa de la saga ${title}`}
            fill
            className="object-contain rounded-md shadow-md"
          />
        </div>
      )}

      <h2
        id="saga-title"
        className="text-xl font-bold mb-4 text-center"
        aria-label={`Título de la saga: ${title}`}
      >
        {title}
      </h2>

      <p className="text-center mb-6" aria-label="Descripción general de la saga">
        {text}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2">
        {children}
      </div>

      {bottomImageUrl && (
        <div className="relative mt-4 mx-auto w-full max-w-4xl h-[250px]">
          <Image
            src={bottomImageUrl}
            alt={`Banner inferior de la saga ${title}`}
            fill
            className="object-contain"
          />
        </div>
      )}
    </section>
  );
};
