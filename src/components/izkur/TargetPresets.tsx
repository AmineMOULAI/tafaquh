"use client";

interface TargetPresetsProps {
  currentTargetGoal: number;
  onSelectGoal: (goal: number) => void;
}

export default function TargetPresets({ currentTargetGoal, onSelectGoal }: TargetPresetsProps) {
  const presets = [33, 99, 100, 1000];

  return (
    <div className="flex items-center justify-center gap-3 my-3">
      <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]/80">
        الهدف:
      </span>
      {presets.map((goal) => {
        const isSelected = currentTargetGoal === goal;

        return (
          <button
            key={goal}
            onClick={() => onSelectGoal(goal)}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
              isSelected
                ? "bg-[#D4AF37] text-[#0A0D0B] border-[#D4AF37]"
                : "bg-black/30 text-emerald-200 border-[#D4AF37]/20 hover:border-[#D4AF37]"
            }`}
          >
            {goal}
          </button>
        );
      })}
    </div>
  );
}
