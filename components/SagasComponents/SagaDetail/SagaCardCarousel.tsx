"use client";

import { useState, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import WantedBG from "@/assets/wanted-bg.jpg";
import Image from "next/image";

export type CardData = {
  title: string;
  text: string;
  imageUrl?: string;
  bottomImageUrl?: string;
};

type SagaCardCarouselProps = {
  cards: CardData[];
  extraContent?: (index: number) => ReactNode;
};

export const SagaCardCarousel = ({
  cards,
  extraContent,
}: SagaCardCarouselProps) => {
  const [[currentIndex, direction], setIndex] = useState<[number, number]>([
    0, 0,
  ]);

  if (!cards || cards.length === 0) return null;

  const paginate = (newDirection: number) => {
    setIndex(([prev]) => [
      (prev + newDirection + cards.length) % cards.length,
      newDirection,
    ]);
  };

  const currentCard = cards[currentIndex];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={clsx(
        "relative w-[620px] min-h-[420px] bg-[#fdf5e6]",
        "border-[10px] border-[#d2b48c] rounded-md shadow-xl",
        "text-brown-900 font-serif px-6 pt-2 pb-4",
        "overflow-visible"
      )}
      style={{
        backgroundImage: `url(${WantedBG.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 10px #aa8c66",
      }}
      role="region"
      aria-label="Saga card carousel"
    >
      <div className="relative w-full">


        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentCard.title}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute w-full h-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col gap-2 px-4 py-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#c2a676] scrollbar-track-transparent"

            >
              {currentCard.bottomImageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="relative max-w-full h-[130px] mt-4 mx-auto shadow-md rounded overflow-hidden"
                >
                  <Image
                    src={currentCard.bottomImageUrl}
                    alt={`Image for ${currentCard.title}`}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 600px) 100vw, 580px"
                  />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      {currentIndex === 0 && currentCard.imageUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="relative w-32 h-32 mx-auto mt-3 rounded-full border-4 border-[#d2b48c] overflow-hidden"
        >
          <Image
            src={currentCard.imageUrl}
            alt={`Portrait of ${currentCard.title}`}
            fill
            style={{ objectFit: "cover" }}
            sizes="128px"
          />
        </motion.div>
      )}

      {extraContent && <div className="mt-4">{extraContent(currentIndex)}</div>}

      <button
        onClick={() => paginate(-1)}
        aria-label="Previous card"
        className="absolute -left-6 top-1/2 -translate-y-1/2 bg-[#d2b48c] hover:bg-[#c2a676] rounded-full p-2 shadow-md transition cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 text-[#4a3728]" />
      </button>
      <button
        onClick={() => paginate(1)}
        aria-label="Next card"
        className="absolute -right-6 top-1/2 -translate-y-1/2 bg-[#d2b48c] hover:bg-[#c2a676] rounded-full p-2 shadow-md transition cursor-pointer"
      >
        <ChevronRight className="w-6 h-6 text-[#4a3728]" />
      </button>
    </motion.div>
  );
};
