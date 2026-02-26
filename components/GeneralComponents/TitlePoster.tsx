import Image from "next/image";

type TitlePosterProps = {
  imageUrl: string;
  imageAlt?: string; 
};

export const TitlePoster = ({ imageUrl, imageAlt = "" }: TitlePosterProps) => {
  return (
    <div className="w-full max-w-[268px] h-auto">
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={268}
        height={67}
        className="rounded-lg shadow-2xl drop-shadow-xl object-contain"
        role="presentation"
        priority
      />
    </div>
  );
};
