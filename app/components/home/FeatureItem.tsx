import type { ReactNode } from "react";

type FeatureItemProps = {
  icon: ReactNode;
  title: string;
  text: string;
  animationClass: string;
};

export default function FeatureItem({
  icon,
  title,
  text,
  animationClass,
}: FeatureItemProps) {
  return (
    <div className={`home-reveal ${animationClass} flex items-center gap-3`}>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#47208f] to-[#25135a] text-[#c084fc] shadow-[0_10px_30px_rgba(93,45,196,0.28)] transition duration-300 hover:scale-105">
        {icon}
      </div>

      <div>
        <h3 className="text-[12px] font-semibold text-white">{title}</h3>
        <p className="mt-1 text-[11px] text-slate-400">{text}</p>
      </div>
    </div>
  );
}
