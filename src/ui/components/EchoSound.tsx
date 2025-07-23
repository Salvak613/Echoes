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
      audioRef.current.play().catch(() => {});
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
        Votre navigateur ne supporte pas l'audio.
      </audio>
    </div>
  );
}
