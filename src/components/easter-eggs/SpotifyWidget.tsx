"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tracks = [
  { title: "Blinding Lights", artist: "The Weeknd" },
  { title: "As It Was", artist: "Harry Styles" },
  { title: "Levitating", artist: "Dua Lipa" },
  { title: "Stay", artist: "The Kid LAROI" },
  { title: "Shivers", artist: "Ed Sheeran" },
];

const track = tracks[Math.floor(Math.random() * tracks.length)];

export function SpotifyWidget() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ delay: 3, duration: 0.4 }}
          className="fixed bottom-6 right-6 z-20 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1a1a22] border border-[rgba(240,237,230,0.08)] shadow-xl"
          data-cursor="hover"
        >
          {/* Equaliser bars */}
          <div className="flex items-end gap-[3px] h-4 w-5 flex-shrink-0" aria-hidden="true">
            {[6, 12, 8, 14, 10].map((h, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-[#c8f060]"
                animate={{ height: [h, h + 6, h - 2, h] }}
                transition={{ duration: 0.6 + i * 0.1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                style={{ height: h }}
              />
            ))}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-body text-[rgba(240,237,230,0.35)] tracking-wider uppercase">Currently vibing to</span>
            <span className="text-[13px] font-display font-semibold text-[#f0ede6] truncate">{track.title}</span>
            <span className="text-[11px] font-body text-[rgba(240,237,230,0.45)]">{track.artist}</span>
          </div>
          <button
            onClick={() => setVisible(false)}
            aria-label="Dismiss"
            className="ml-1 text-[rgba(240,237,230,0.25)] hover:text-[rgba(240,237,230,0.6)] transition-colors text-lg leading-none"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
