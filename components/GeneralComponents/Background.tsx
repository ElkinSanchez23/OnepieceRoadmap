import Image, { StaticImageData } from 'next/image';
import React from 'react';

type Props = {
  children: React.ReactNode;
  image: StaticImageData;
};

const Background = ({ children, image }: Props) => {
  return (
    <div className="relative min-h-screen">
      <Image
        src={image}
        alt=""
        role="presentation"
        fill
        className="absolute inset-0 -z-10 object-cover opacity-95"
      />
      {children}
    </div>
  );
};



export default Background;