import React from "react";

export const Tile: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => (
  <div
    className={`bg-[#1E1E24] border border-[#2A2A35] rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.2)] ${className}`}
  >
    {children}
  </div>
); 