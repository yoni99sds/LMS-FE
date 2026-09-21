import { ReactNode } from "react";
type Props = {
  title: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
};

const StatCard = ({ title, value, sub, icon }: Props) => {
  return (
    <div className="bg-background border rounded-2xl p-5 flex items-center gap-4 min-w-0">
      
      {/* ICON */}
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      {/* TEXT */}
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
};

export default StatCard;