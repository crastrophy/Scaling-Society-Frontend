import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { Button } from "./ui/button";

interface HeaderProps {
  dateRange?: string;
  onDateChange?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ dateRange = 'May 1 – May 31, 2025', onDateChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-end px-8 py-6 bg-transparent">
      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setOpen((v) => !v)}
        >
          <Calendar className="w-5 h-5 text-blue-500" />
          <span>{dateRange}</span>
          <ChevronDown className="w-4 h-4 text-blue-400" />
        </Button>
        {open && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
            {/* Placeholder for calendar dropdown */}
            <div className="text-gray-500 text-sm text-center py-8">Calendar picker coming soon...</div>
          </div>
        )}
      </div>
    </header>
  );
};