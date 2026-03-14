import React from 'react';
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function PriorityBadge({ priority }) {
  if (priority === 1) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
        <AlertCircle className="w-3 h-3" /> Emergency
      </span>
    );
  } else if (priority === 2) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
        <Clock className="w-3 h-3" /> Semi-Urgent
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
      <CheckCircle2 className="w-3 h-3" /> Normal Walk-in
    </span>
  );
}
