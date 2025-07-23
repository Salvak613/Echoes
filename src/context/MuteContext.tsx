"use client";

import { createContext, useContext, useState } from "react";

interface MuteContextType {
  muted: boolean;
  setMuted: (muted: boolean) => void;
}

const MuteContext = createContext<MuteContextType | undefined>(undefined);

export function MuteProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);
  return <MuteContext value={{ muted, setMuted }}>{children}</MuteContext>;
}

export function useMute() {
  const context = useContext(MuteContext);
  if (!context) {
    throw new Error("useMute must be used within a MuteProvider");
  }
  return context;
}
