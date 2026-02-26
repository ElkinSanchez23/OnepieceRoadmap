import React, { ReactNode } from "react";
import Image from "next/image";

type TextProps = {
  title: string;
  text: string;
  children?: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  bottomImageUrl?: string;
  bottomImageAlt?: string;
};

export const ScrollFeature = ({
  title,
  text,
  children,
  imageUrl,
  imageAlt = "",
  bottomImageUrl,
  bottomImageAlt = "",
}: TextProps) => {
  return (
    <section
      className="bg-yellow-100 border border-yellow-400 rounded-lg shadow-lg p-6 w-full max-w-[950px] min-h-[650px] text-brown-800 mx-auto"
      style={{ boxShadow: "inset 0 0 30px #7b4c20" }}
    >
      {imageUrl && (
        <div className="mb-2 mx-auto relative w-full h-[110px]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            priority
            fill
            className="object-contain"
            role={imageAlt === "" ? "presentation" : undefined}
          />
        </div>
      )}

      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <p className="text-center">{text}</p>

      <div className="flex flex-row justify-center items-center mt-4">
        {children}
      </div>

      {bottomImageUrl && (
        <div className="relative mt-4 mx-auto max-w-full max-h-[350px] h-auto w-full">
          <Image
            src={bottomImageUrl}
            alt={bottomImageAlt}
            priority
            width={480}
            height={280}
            className="mx-auto object-contain max-w-full h-auto"
            role={bottomImageAlt === "" ? "presentation" : undefined}
          />
        </div>
      )}
    </section>
  );
};
