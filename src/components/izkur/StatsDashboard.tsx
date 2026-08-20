'use client';

import { StarGeometricIcon } from '@/components/jalsa/Icons';

interface StatsDashboardProps {
  totalToday: number;
  streakDays: number;
  phraseCounts: Record<string, number>;
}

export default function StatsDashboard({ totalToday, streakDays }: StatsDashboardProps) {
  return (
    <div className="w-full max-w-md bg-[#0B3B2C]/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl p-5 my-6 text-white shadow-xl">
      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 mb-4">
        <h3 className="font-calligraphy text-lg text-[#D4AF37]">
          إحصائيات الذِكْـر
        </h3>
        <span className="text-xs font-mono text-emerald-200/70">
          تتبع مباشر
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center mb-4">
        <div className="bg-black/30 p-3 rounded-xl border border-[#D4AF37]/10">
          <span className="block text-2xl font-black text-[#D4AF37]">
            {totalToday}
          </span>
          <span className="text-xs font-mono text-emerald-100/70">
            إجمالي اليوم
          </span>
        </div>

        <div className="bg-black/30 p-3 rounded-xl border border-[#D4AF37]/10">
          <span className="text-2xl font-black text-[#D4AF37] flex items-center justify-center gap-1">
            <span>{streakDays}</span>
            <StarGeometricIcon className="w-4 h-4 text-gold inline" />
          </span>
          <span className="text-xs font-mono text-emerald-100/70">
            الأيام المتتالية
          </span>
        </div>
      </div>
    </div>
  );
}
