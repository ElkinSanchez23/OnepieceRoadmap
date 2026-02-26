"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import cardImages from "@/assets/islandCardImages";

interface IslandCardProps {
  id: string;
  title: string;
  description: string;
}

export default function IslandCard({ id, title, description }: IslandCardProps) {
  const image = cardImages[id];
  const headingId = `island-title-${id}`;

  return (
    <motion.article
      className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg shadow-md hover:scale-[1.02] transition flex flex-col md:flex-row items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
      aria-labelledby={headingId}
    >
      <div className="w-full md:w-1/2 h-48 relative">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover rounded-md border border-yellow-600"
            role="presentation"
          />
        )}
      </div>

      <div className="w-full md:w-1/2">
        <h3 id={headingId} className="text-lg font-semibold text-yellow-900 mb-1">
          {title}
        </h3>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </motion.article>
  );
}
