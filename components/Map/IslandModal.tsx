"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import cardImages from "@/assets/islandCardImages";
import { X } from "lucide-react";
import FocusLock from "react-focus-lock";

interface IslandModalProps {
  isOpen: boolean;
  onClose: () => void;
  islandName: string;
  description: string;
  cards?: { id: string; title: string; description: string }[];
}

export default function IslandModal({
  isOpen,
  onClose,
  islandName,
  description,
  cards = [],
}: IslandModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCard = cards[activeIndex];
  const titleId = useId();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <FocusLock returnFocus>
            <motion.div
              className="bg-[#fffaf3] p-6 rounded-2xl max-w-3xl w-full relative shadow-lg border-4 border-yellow-600"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute cursor-pointer top-4 right-4 p-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <h2
                id={titleId}
                className="text-3xl font-bold mb-2 text-yellow-800"
              >
                {islandName}
              </h2>
              <p className="text-gray-800 mb-6">{description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {cards.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => setActiveIndex(index)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border cursor-pointer transition ${
                      index === activeIndex
                        ? "bg-yellow-500 text-white border-yellow-600"
                        : "bg-white text-yellow-800 border-yellow-400 hover:bg-yellow-100"
                    }`}
                    aria-pressed={index === activeIndex}
                  >
                    {card.title}
                  </button>
                ))}
              </div>

              {activeCard && (
                <section className="flex flex-col md:flex-row items-center gap-4">
                  <div className="w-full md:w-3/5 aspect-[3/2] relative min-h-[20rem]">
                    {cardImages[activeCard.id] && (
                      <Image
                        src={cardImages[activeCard.id]}
                        alt=""
                        sizes="60"
                        role="presentation"
                        className="object-contain w-full h-full rounded-lg border border-yellow-600"
                      />
                    )}
                  </div>

                  <article className="w-full md:w-1/2 space-y-2">
                    <h3 className="text-xl font-semibold text-yellow-900">
                      {activeCard.title}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {activeCard.description}
                    </p>
                  </article>
                </section>
              )}
            </motion.div>
          </FocusLock>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
