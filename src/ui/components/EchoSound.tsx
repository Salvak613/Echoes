"use client";

import { EchoModel } from "@/model/EchoModel";
import { useRef, useEffect } from "react";
import { useMute } from "@/context/MuteContext";

export default function EchoViewer({ Echo }: { Echo: EchoModel }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { muted } = useMute();

  useEffect(() => {
    if (Echo.music_path && audioRef.current) {
      audioRef.current.load();
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          const duration = 2000;
          const step = 0.01;
          const interval = duration / (1 / step);
          let currentVolume = 0;
          const fade = setInterval(() => {
            currentVolume += step;
            if (!audioRef.current) {
              clearInterval(fade);
              return;
            }
            if (currentVolume >= 1) {
              audioRef.current.volume = 1;
              clearInterval(fade);
            } else {
              audioRef.current.volume = currentVolume;
            }
          }, interval);
        })
        .catch(() => {});
    }
  }, [Echo.music_path]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <div>
      <audio ref={audioRef} style={{ display: "none" }} controls loop>
        {Echo.music_path && <source src={`/Lofi/${Echo.music_path}`} />}
        Votre navigateur ne supporte pas l&apos;audio.
      </audio>
    </div>
  );
}
