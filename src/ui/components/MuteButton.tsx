import React from "react";

interface MuteButtonProps {
  muted: boolean;
  setMuted: (muted: boolean) => void;
  className?: string;
}

export default function MuteButton({
  muted,
  setMuted,
  className,
}: MuteButtonProps) {
  return (
    <button
      type="button"
      onClick={() => setMuted(!muted)}
      className={className}
      aria-label={muted ? "Remettre le son" : "Couper le son"}
    >
      <span>{muted ? "🔇" : "🔊"}</span>
    </button>
  );
}
